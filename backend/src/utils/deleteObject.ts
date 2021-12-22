import { s3 } from "./s3";

export function deleteObject(bucketName: string, key: string) {
  return new Promise((resolve, reject) => {
    s3.deleteObject(
      {
        Bucket: bucketName,
        Key: key,
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}

export function deleteObjects() {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(
      {
        Bucket: process.env.BUCKET_NAME as string,
      },
      async (err, data) => {
        if (err) {
          reject(err);
        } else {
          await s3.deleteObjects();
        }
      }
    );
  });
}
