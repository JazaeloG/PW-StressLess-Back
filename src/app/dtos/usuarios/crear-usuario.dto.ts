import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { SexoEnum } from "src/shared/enums/sexo.enum";
import { MensajesSistema } from "src/shared/helpers/mensajes-sistema.helper";


export class CrearUsuarioDto {

    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @IsNotEmpty({ message: MensajesSistema.CAMPO_VACIO })
    @MaxLength(50, { message: MensajesSistema.CAMPO_LIMITE_MAXIMO })
    usuario_Nombre: string;

    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @IsNotEmpty({ message: MensajesSistema.CAMPO_VACIO })
    @MaxLength(50, { message: MensajesSistema.CAMPO_LIMITE_MAXIMO })
    usuario_Apellido: string;

    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @IsNotEmpty({ message: MensajesSistema.CAMPO_VACIO })
    usuario_Correo: string;

    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @IsNotEmpty({ message: MensajesSistema.CAMPO_VACIO })
    usuario_Sexo: SexoEnum;

    @IsNotEmpty({ message: MensajesSistema.CAMPO_VACIO })
    usuario_Edad: number;

    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @IsNotEmpty({ message: MensajesSistema.CAMPO_VACIO })
    @MaxLength(255, { message: MensajesSistema.CAMPO_LIMITE_MAXIMO })
    usuario_Password: string;

}