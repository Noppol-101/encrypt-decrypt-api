// test/encryption/encryption.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionController } from '../src/encryption/encryption.controller';
import { EncryptionService } from '../src/encryption/encryption.service';

describe('EncryptionController', () => {
  let controller: EncryptionController;
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncryptionController],
      providers: [
        {
          provide: EncryptionService,
          useValue: {
            encryptData: jest.fn(),
            decryptData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EncryptionController>(EncryptionController);
    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should return encrypted data from service', () => {
    const mockData = { data1: 'abc', data2: 'xyz' };
    jest.spyOn(service, 'encryptData').mockReturnValue(mockData);

    const result = controller.encrypt({ payload: 'test' });
    expect(result).toEqual({
      successful: true,
      error_code: null,
      data: mockData,
    });
  });

  it('should return error_code when encryption throws', () => {
    jest.spyOn(service, 'encryptData').mockImplementation(() => {
      throw new Error('Simulated encryption error');
    });

    const result = controller.encrypt({ payload: 'test' });
    expect(result).toEqual({
      successful: false,
      error_code: 500,
      data: null,
    });
  });

  it('should return decrypted data from service', () => {
    jest.spyOn(service, 'decryptData').mockReturnValue('decrypted');

    const result = controller.decrypt({ data1: 'abc', data2: 'xyz' });
    expect(result).toEqual({
      successful: true,
      error_code: null,
      data: 'decrypted',
    });
  });

  it('should return error_code when decryption throws', () => {
    jest.spyOn(service, 'decryptData').mockImplementation(() => {
      throw new Error('Simulated decryption error');
    });

    const result = controller.decrypt({ data1: 'bad', data2: 'data' });
    expect(result).toEqual({
      successful: false,
      error_code: 500,
      data: null,
    });
  });
});
