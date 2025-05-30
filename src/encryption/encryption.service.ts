import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as crypto from 'crypto';
import { resolve } from 'path';

@Injectable()
export class EncryptionService {
  private privateKey: Buffer;
  private publicKey: Buffer;

  constructor() {
    this.privateKey = readFileSync(resolve('keys/private.pem'));
    this.publicKey = readFileSync(resolve('keys/public.pem'));
  }

  encryptData(payload: string): { data1: string; data2: string } {
    try {
      const aesKey = crypto.randomBytes(32);
      const iv = crypto.randomBytes(16);

      const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
      let encryptedData = cipher.update(payload, 'utf8', 'base64');
      encryptedData = encryptedData + cipher.final('base64');

      const encryptedKey = crypto.privateEncrypt(this.privateKey, Buffer.concat([aesKey, iv]));

      return {
        data1: encryptedKey.toString('base64'),
        data2: encryptedData,
      };
    } catch (error) {
      throw new Error(`Encrypt failed`);
    }
  }

  decryptData(data1: string, data2: string): string {
    try {
      const encryptedKeyBuffer = Buffer.from(data1, 'base64');
      const decryptedKeyIV = crypto.publicDecrypt(this.publicKey, encryptedKeyBuffer);

      const aesKey = decryptedKeyIV.subarray(0, 32);
      const iv = decryptedKeyIV.subarray(32);

      const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
      let decryptedPayload = decipher.update(data2, 'base64', 'utf8');
      decryptedPayload = decryptedPayload + decipher.final('utf8');

      return decryptedPayload;
    } catch (error) {
      throw new Error(`Decrypt failed`);
    }
  }
}
