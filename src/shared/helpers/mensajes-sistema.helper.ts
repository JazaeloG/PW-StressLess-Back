export enum MensajesSistema {
    CAMPO_STRING = 'El campo $property debe ser de tipo string',
    CAMPO_DATE = 'El campo $property debe ser de tipo date',
    CAMPO_NUMBER = 'El campo $property debe ser de tipo number',
    CAMPO_VACIO = 'El campo $property no puede estar vacío',
    CAMPO_LIMITE_MAXIMO = 'El campo $property excede el límite máximo de $constraint1',
    CAMPO_LIMITE_MINIMO = 'El campo $property no alcanza el límite mínimo de $constraint1',
    CAMPO_ARRAY = 'El campo $property debe ser de tipo array',
    CAMPO_ARRAY_NO_VACIO = 'El campo array $property no puede estar vacío',
    CAMPO_LIMITE_EXACTO = 'El campo $property debe tener una longitud exacta de $constraint1',
    CAMPO_INVALIDO = 'El campo $property es inválido',
}