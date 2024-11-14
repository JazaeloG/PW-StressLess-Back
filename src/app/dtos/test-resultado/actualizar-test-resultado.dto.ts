import { IsNotEmpty, IsString } from 'class-validator';

export class ActualizarTestResultadoDto {
  @IsNotEmpty()
  @IsString()
  resultado: string;
}