import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CrearProgresoUsuarioDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  usuarioId: number;

  @IsNotEmpty()
  @IsNumber()
  nivelEstresAntes: number;

  @IsNotEmpty()
  @IsNumber()
  nivelEstresNuevo: number;
}