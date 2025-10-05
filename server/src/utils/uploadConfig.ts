import crypto from 'crypto';
import { Request } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();

// Enhanced file validation
const allowedMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

// Check file signature (magic numbers) to prevent MIME type spoofing
const getFileTypeFromBuffer = (buffer: Buffer): string | null => {
  const header = buffer.toString('hex', 0, 4);
  
  // JPEG files start with FFD8 (and can have different third bytes)
  if (header.startsWith('ffd8')) {
    return 'image/jpeg';
  }
  
  // PNG files start with 89504E47
  if (header === '89504e47') {
    return 'image/png';
  }
  
  // WebP files start with 52494646 (RIFF)
  if (header === '52494646') {
    // Need to check more bytes for WebP - WEBP should appear at bytes 8-11
    const webpHeader = buffer.toString('hex', 8, 12);
    if (webpHeader === '57454250') { // 'WEBP'
      return 'image/webp';
    }
  }
  
  return null;
};

const secureFileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check MIME type
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }

  // Check file extension
  const ext = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
  if (!allowedExtensions.includes(ext)) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }

  // Additional validation will be done after buffer is available
  cb(null, true);
};

// Validate file after upload (buffer available)
export const validateFileContent = (file: Express.Multer.File): boolean => {
  if (!file.buffer) {
    return false;
  }

  // Check file signature - this is the critical security check
  const detectedType = getFileTypeFromBuffer(file.buffer);
  return detectedType !== null && detectedType === file.mimetype;
};

export const imageUpload = multer({
  storage,
  fileFilter: secureFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 12, // max 12 files
    fieldSize: 1024 * 1024 // 1MB field size limit
  }
});

export const singleImageUpload = multer({
  storage,
  fileFilter: secureFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1, // 1 file only
    fieldSize: 1024 * 1024 // 1MB field size limit
  }
});

// Helper to add secure random filename
export const addTimestampToFiles = (files: Express.Multer.File | Express.Multer.File[]) => {
  const fileArray = Array.isArray(files) ? files : [files];
  fileArray.forEach(file => {
    // Generate secure random filename to prevent conflicts and attacks
    const randomId = crypto.randomBytes(16).toString('hex');
    const timestamp = Date.now();
    const ext = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    file.originalname = `${timestamp}_${randomId}${ext}`;
  });
};

// Batch file content validation
export const validateFiles = (files: Express.Multer.File[]): { valid: Express.Multer.File[], invalid: string[]; } => {
  const valid: Express.Multer.File[] = [];
  const invalid: string[] = [];

  files.forEach(file => {
    if (validateFileContent(file)) {
      valid.push(file);
    } else {
      invalid.push(file.originalname);
    }
  });

  return { valid, invalid };
};