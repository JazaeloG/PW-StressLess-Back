import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { MensajesSistema } from "src/shared/helpers/mensajes-sistema.helper";

export class CrearRecomendacionDto {

    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @IsNotEmpty({ message: MensajesSistema.CAMPO_VACIO })
    @MaxLength(100, { message: MensajesSistema.CAMPO_LIMITE_MAXIMO })
    recomendacion_Titulo: string;

    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @IsNotEmpty({ message: MensajesSistema.CAMPO_VACIO })
    @MaxLength(500, { message: MensajesSistema.CAMPO_LIMITE_MAXIMO })
    recomendacion_Descripcion: string;

    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @IsNotEmpty({ message: MensajesSistema.CAMPO_VACIO })
    recomendacion_Fecha: string;

    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @IsNotEmpty({ message: MensajesSistema.CAMPO_VACIO })
    @MaxLength(50, { message: MensajesSistema.CAMPO_LIMITE_MAXIMO })
    recomendacion_Autor: string;
}