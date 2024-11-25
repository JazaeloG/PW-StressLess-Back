import { IsNotEmpty, IsString } from "class-validator";

export class CrearPreguntaDto {
  @IsNotEmpty()
  @IsString()
  pregunta_Texto: string;
}