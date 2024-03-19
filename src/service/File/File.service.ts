import { FileServiceInterface } from "./FileService.interface";
import * as fs from "fs";

export class FileService implements FileServiceInterface {
  constructor() {}
  async move(oldPath: string, newPath: string): Promise<boolean> {
    let arr = newPath.split("/");
    arr.pop();
    await fs.mkdir(arr.join("/"), (err) => {
      if (!err || err.code === "EEXIST") {
        fs.rename(oldPath, newPath, (err) => {
          if (err) return Promise.resolve(false);
        });
      }
    });

    return Promise.resolve(true);
  }
}
