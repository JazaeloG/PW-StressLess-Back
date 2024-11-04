import { IsNotEmpty, IsString } from "class-validator";
import { MensajesSistema } from "src/shared/helpers/mensajes-sistema.helper";

export class LoginUsuarioDto{

    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @IsNotEmpty({ message: MensajesSistema.CAMPO_VACIO })
    usuario_Correo: string;

    @IsString({ message: MensajesSistema.CAMPO_STRING })
    @IsNotEmpty({ message: MensajesSistema.CAMPO_VACIO })
    usuario_Password: string;
}