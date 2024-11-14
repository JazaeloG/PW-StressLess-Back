import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CrearTestResultadoDto {
  @IsNotEmpty()
  @IsNumber()
  usuarioId: number;

  @IsNotEmpty()
  @IsNumber()
  testId: number;

  @IsNotEmpty()
  @IsString()
  resultado: string;
}