const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

async function s3UploadV3(files) {
    const s3Client = new S3Client();
    const params = files.map(file => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${file.originalname}`,
            Body: file.buffer
        }
    })

    return await Promise.all(
        params.map(param => s3Client.send(new PutObjectCommand(param)))
    )
}

module.exports = s3UploadV3