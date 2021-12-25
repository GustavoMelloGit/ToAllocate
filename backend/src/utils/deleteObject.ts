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
          if (data.Contents) {
            let cont = 0;
            const keys = data.Contents.map((content) => content.Key);
            const promises = keys.map((key) => {
              if (key !== process.env.DEFAULT_PROJECT_IMAGE) {
                deleteObject(process.env.BUCKET_NAME as string, key as string);
                cont++;
              }
            });
            await Promise.all(promises);
            resolve(cont);
          }
        }
      }
    );
  });
}
