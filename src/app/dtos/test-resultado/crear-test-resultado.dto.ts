import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CrearTestResultadoDto {
  @IsNotEmpty()
  @IsNumber()
  usuarioId: number;

  @IsNotEmpty()
  @IsNumber()
  testId: number;

  @IsNotEmpty()
  @IsNumber()
  testResultado_Puntaje: number;

  @IsNotEmpty()
  @IsString()
  testResultado_Comentarios: string;

  @IsNotEmpty()
  testResultado_Fecha: Date;
}
