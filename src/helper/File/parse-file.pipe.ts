import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class ParseFile implements PipeTransform {
  constructor(private FileRequired: boolean = true) {}
  transform(
    files: Express.Multer.File | Express.Multer.File[],
    metadata: ArgumentMetadata
  ): Express.Multer.File | Express.Multer.File[] {
    if (
      (files === undefined && this.FileRequired) ||
      (files === null && this.FileRequired)
    ) {
      throw new BadRequestException("Validation failed (file expected)");
    }

    if (Array.isArray(files) && files.length === 0) {
      throw new BadRequestException("Validation failed (files expected)");
    }

    return files;
  }
}
