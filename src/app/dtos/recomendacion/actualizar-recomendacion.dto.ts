import { IsOptional, IsString, MaxLength } from "class-validator";
import { MensajesSistema } from "src/shared/helpers/mensajes-sistema.helper";

export class ActualizarRecomendacionDto {

    @IsOptional()
    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @MaxLength(100, { message: MensajesSistema.CAMPO_LIMITE_MAXIMO })
    recomendacion_Titulo?: string;

    @IsOptional()
    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @MaxLength(500, { message: MensajesSistema.CAMPO_LIMITE_MAXIMO })
    recomendacion_Descripcion?: string;

    @IsOptional()
    @IsString({ message: MensajesSistema.CAMPO_STRING })
    recomendacion_Fecha?: string;

    @IsOptional()
    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @MaxLength(50, { message: MensajesSistema.CAMPO_LIMITE_MAXIMO })
    recomendacion_Autor?: string;
}