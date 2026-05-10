import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FilesUploadService } from './file-upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { FilesUploadRepository } from './file-upload.repository';
import { CloudinaryConfig } from '../config/cloudinary.config';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FileUploadController],
  providers: [CloudinaryConfig, FilesUploadService, FilesUploadRepository],
})
export class FileUploadModule {}
