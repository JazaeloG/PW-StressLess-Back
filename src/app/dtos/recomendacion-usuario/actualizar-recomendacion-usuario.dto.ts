import { IsNotEmpty, IsString } from 'class-validator';

export class ActualizarRecomendacionUsuarioDto {
  @IsNotEmpty()
  @IsString()
  recomendacion: string;
}