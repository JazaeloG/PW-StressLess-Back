import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CrearTestDto {
  @IsNotEmpty()
  @IsString()
  test_Nombre: string;

  @IsNotEmpty()
  @IsString()
  test_Descripcion: string;

  @IsOptional() 
  test_FechaCreacion?: Date;
}
