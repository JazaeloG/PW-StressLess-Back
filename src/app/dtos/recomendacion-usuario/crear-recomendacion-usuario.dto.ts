import { IsNotEmpty, IsString } from 'class-validator';

export class CrearRecomendacionUsuarioDto {
  @IsNotEmpty()
  @IsString()
  recomendacion: string;

  @IsNotEmpty()
  @IsString()
  usuarioId: string;
}