declare namespace Express.Multer {
  export interface File {
    originalname: string;
    key: string;
    size: number;
    location: string;
    image_url: string[];
  }
}
