/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { FilesUploadRepository } from './file-upload.repository';

@Injectable()
export class FilesUploadService {
  constructor(private readonly filesUploadRepository: FilesUploadRepository) {}

  async uploadToCloudinary(
    file: Express.Multer.File,
  ): Promise<{ url: string }> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: 'image' },
          (error: Error | undefined, result: UploadApiResponse | undefined) => {
            if (error) {
              reject(
                new BadRequestException('Error al subir imagen a Cloudinary'),
              );
            } else if (result) {
              resolve({ url: result.secure_url });
            }
          },
        )
        .end(file.buffer);
    });
  }

  async uploadImage(id: string, file: Express.Multer.File) {
    const { url } = await this.uploadToCloudinary(file);

    return this.filesUploadRepository.updateProductImage(id, url);
  }
}
