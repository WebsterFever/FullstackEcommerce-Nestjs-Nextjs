import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizePipe implements PipeTransform {
  private readonly maxSizeInBytes: number;

  constructor(maxSizeKb: number = 200) {
    this.maxSizeInBytes = maxSizeKb * 1024;
  }

  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No se recibió ningún archivo.');
    }

    if (value.size > this.maxSizeInBytes) {
      throw new BadRequestException(
        `El archivo excede el tamaño máximo permitido de ${
          this.maxSizeInBytes / 1024
        }KB. ` + `Tamaño recibido: ${(value.size / 1024).toFixed(2)}KB.`,
      );
    }

    return value;
  }
}
