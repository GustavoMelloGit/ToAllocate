import aws from "aws-sdk";
import crypto from "crypto";
import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AppError from "../shared/errors/AppError";

dotenv.config();

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "tmp"));
    },
    filename: (req: any, file: any, cb: any) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const filename = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, filename);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
};

const multerConfig = {
  dest: path.resolve(__dirname, "..", "tmp"),
  storage: storageTypes[process.env.STORAGE_TYPE === "s3" ? "s3" : "local"],
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) return cb(null, true);

    return cb(new AppError("Invalid file type."));
  },
};

export default multerConfig;
