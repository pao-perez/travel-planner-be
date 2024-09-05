import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CityDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsOptional() // Optional because in some cases we don't need this field (e.g., in the list)
  description?: string;
}
