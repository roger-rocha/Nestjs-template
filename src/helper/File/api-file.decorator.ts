import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { fileMimetypeFilter } from "./file-mimetype-filter";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";

import e from "express";

export function ApiFile(
  fieldName: string = "file",
  path: string = "./public/uploads",
  type: any
) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        fileFilter: fileMimetypeFilter("image"),
        storage: diskStorage({
          destination(
            req: e.Request,
            file: Express.Multer.File,
            callback: (error: Error | null, path: string) => void
          ) {
            callback(null, path);
          },
          filename(
            req: e.Request,
            file: Express.Multer.File,
            callback: (error: Error | null, filename: string) => void
          ) {
            const extension = file.originalname.split(".")[1];
            callback(null, `${uuidv4()}.${extension}`);
          },
        }),
      })
    ),
    ApiConsumes("multipart/form-data"),
    ApiBody({ type: type })
  );
}
