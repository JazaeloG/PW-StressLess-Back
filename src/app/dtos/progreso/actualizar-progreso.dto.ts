import { IsNotEmpty, IsString } from 'class-validator';

export class ActualizarProgresoUsuarioDto {
  @IsNotEmpty()
  @IsString()
  progreso: string;
}