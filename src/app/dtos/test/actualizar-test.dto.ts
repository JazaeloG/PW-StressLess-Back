import { IsOptional, IsString } from 'class-validator';

export class ActualizarTestDto {
  @IsOptional()
  @IsString()
  test_Nombre?: string;

  @IsOptional()
  @IsString()
  test_Descripcion?: string;

  @IsOptional()
  test_FechaCreacion?: Date;
}
