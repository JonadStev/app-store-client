export interface PromocionDto {
    id?: number,
    idProducto?: number,
    nombreProducto?: string,
    precio?: DoubleRange,
    descuento?: number,
    precioDescuento?: DoubleRange,
    estado?: string
}