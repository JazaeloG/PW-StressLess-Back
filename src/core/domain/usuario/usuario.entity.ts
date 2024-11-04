import { SexoEnum } from "src/shared/enums/sexo.enum";

export class Usuario{
    id_Usuario: number;
    usuario_Nombre: string;
    usuario_Apellido: string;
    usuario_Correo: string;
    usuario_Sexo: SexoEnum;
    usuario_FechaNacimiento: string;
    usuario_Password: string;
    usuario_FechaRegistro: Date;
}