const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

async function s3UploadV3(files) {
    const s3Client = new S3Client();
    let params;
    if (!Array.isArray(files)) {
        params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: files.originalname,
            Body: files.buffer
        };

        return await s3Client.send(new PutObjectCommand(params))
    } else {
        params = files.map(file => {
            return {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: file.originalname,
                Body: file.buffer
            };
        });

        return await Promise.all(
            params.map(param => s3Client.send(new PutObjectCommand(param)))
        );
    }

}

async function s3DeleteV3(files) {
    const s3Client = new S3Client();
    const params = files.map(file => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${file}`,
        };
    });

    return await Promise.all(
        params.map(param => s3Client.send(new DeleteObjectCommand(param)))
    );
}

module.exports = {
    s3UploadV3,
    s3DeleteV3
};