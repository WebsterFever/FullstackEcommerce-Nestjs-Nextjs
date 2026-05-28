import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileMimeTypePipe implements PipeTransform {
  private readonly validMimeTypes: string[];

  constructor(
    validMimeTypes: string[] = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg',
    ],
  ) {
    this.validMimeTypes = validMimeTypes;
  }

  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No se recibió ningún archivo.');
    }

    if (!this.validMimeTypes.includes(value.mimetype)) {
      throw new BadRequestException(
        `Tipo de archivo no permitido: "${value.mimetype}". ` +
          `Tipos aceptados: ${this.validMimeTypes.join(', ')}.`,
      );
    }

    return value;
  }
}
