import { IsString, Length } from 'class-validator';
export class EncryptRequest {
  @IsString()
  @Length(1, 2000)
  payload: string;
}
