import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EncryptRequest } from './request/encrypt.request';
import { DecryptRequest } from './request/decrypt.request';
import { EncryptionService } from './encryption.service';

@ApiTags('Encryption')
@Controller()
export class EncryptionController {
  constructor(private readonly service: EncryptionService) { }

  @Post('/get-encrypt-data')
  @HttpCode(200)
  encrypt(@Body() body: EncryptRequest) {
    try {
      const data = this.service.encryptData(body.payload);
      return {
        successful: true,
        error_code: null,
        data: data,
      };
    } catch (error) {
      return {
        successful: false,
        error_code: 500,
        data: null,
      };
    }
  }

  @Post('/get-decrypt-data')
  @HttpCode(200)
  decrypt(@Body() body: DecryptRequest) {
    try {
      const payload = this.service.decryptData(body.data1, body.data2);
      return {
        successful: true,
        error_code: null,
        data: payload,
      };
    } catch (error) {
      return {
        successful: false,
        error_code: 500,
        data: null,
      };
    }
  }
}
