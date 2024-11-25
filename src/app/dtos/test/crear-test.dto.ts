import { IsNotEmpty, IsString,IsArray } from 'class-validator';
import { CrearPreguntaDto } from '../pregunta/crear-pregunta.dto';

export class CrearTestDto {
  @IsNotEmpty()
  @IsString()
  test_Nombre: string;

  @IsNotEmpty()
  @IsString()
  test_Descripcion: string;

  @IsArray()
  @IsNotEmpty()
  preguntas: CrearPreguntaDto[];
}
