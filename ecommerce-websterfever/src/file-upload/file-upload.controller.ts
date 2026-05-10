import {
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesUploadService } from './file-upload.service';
import { FileSizePipe } from './pipes/file-size.pipe';
import { FileMimeTypePipe } from './pipes/file-mime-type.pipe';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FilesUploadService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new FileSizePipe(200),
      new FileMimeTypePipe([
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg',
      ]),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(id, file);
  }
}
