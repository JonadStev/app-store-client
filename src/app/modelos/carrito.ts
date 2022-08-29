export interface CarritoDto {
    id?: number,
    usuario?: string,
    idProducto?: number,
    nombreProducto?: string,
    precio?: DoubleRange,
    cantidad?: number,
    fecha?: string,
    estado?: string
}