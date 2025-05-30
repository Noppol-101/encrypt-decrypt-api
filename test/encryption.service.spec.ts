import { EncryptionService } from '../src/encryption/encryption.service';

describe('EncryptionService (real keys)', () => {
  let service: EncryptionService;

  beforeAll(() => {
    service = new EncryptionService();
  });

  it('should encrypt and decrypt successfully using real key files', () => {
    const payload = 'Hello world';
    const encrypted = service.encryptData(payload);

    expect(encrypted.data1).toBeDefined();
    expect(encrypted.data2).toBeDefined();

    const decrypted = service.decryptData(encrypted.data1, encrypted.data2);
    expect(decrypted).toBe(payload);
  });

  it('should throw error when decrypting with invalid encrypted data', () => {
    expect(() => {
      service.decryptData('invalid_base64_string', 'invalid_encrypted_data');
    }).toThrow(/Decrypt failed/);
  });
});
