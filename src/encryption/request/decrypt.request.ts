import { IsString } from 'class-validator';
export class DecryptRequest {
  @IsString()
  data1: string;

  @IsString()
  data2: string;
}
