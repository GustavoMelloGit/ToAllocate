import { s3 } from "./s3";

export function deleteFile(filename: string) {
  return new Promise((resolve, reject) => {
    s3.deleteObject(
      {
        Bucket: process.env.BUCKET_NAME as string,
        Key: filename,
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
}

export function deleteObjects(bucketName: string, keys: string[]) {
  return new Promise((resolve, reject) => {
    keys.forEach((key) => {
      const filename = key.substring(key.lastIndexOf("/") + 1);

      if (filename !== process.env.DEFAULT_PROJECT_IMAGE) {
        s3.deleteObject(
          {
            Bucket: bucketName,
            Key: filename,
          },
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      }
    });
  });
}

export function deleteAll() {
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
                deleteObjects(
                  process.env.BUCKET_NAME as string,
                  [key] as string[]
                );
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
