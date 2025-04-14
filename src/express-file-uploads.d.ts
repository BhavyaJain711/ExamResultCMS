// custom.d.ts

import { UploadedFile } from 'express-fileupload';
import { Payload } from 'payload';

declare global {
  namespace Express {
    interface Request {
      payload: Payload;
      files?: {
        [key: string]: UploadedFile;
      };
    }
  }
}
