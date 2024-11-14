import { IsNotEmpty, IsNumber } from 'class-validator';

export class CrearProgresoUsuarioDto {
  @IsNotEmpty()
  @IsNumber()
  usuarioId: number;

  @IsNotEmpty()
  @IsNumber()
  nivelEstresAntes: number;

  @IsNotEmpty()
  @IsNumber()
  nivelEstresNuevo: number;

  @IsNotEmpty()
  fecha: Date;
}
