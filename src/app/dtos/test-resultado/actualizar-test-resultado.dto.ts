import { IsOptional, IsString, IsNumber } from 'class-validator';

export class ActualizarTestResultadoDto {
  @IsOptional()
  @IsNumber()
  testResultado_Puntaje?: number;

  @IsOptional()
  @IsString()
  testResultado_Comentarios?: string;

  @IsOptional()
  testResultado_Fecha?: Date;
}
