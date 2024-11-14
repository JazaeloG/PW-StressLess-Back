import { IsNotEmpty, IsString } from 'class-validator';

export class ActualizarTestDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;
}