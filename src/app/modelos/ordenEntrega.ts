export interface OrdenEntregaDto {
    id?: number,
    idUsuario?: number,
    nombreCliente?: string,
    idRepartidor?: number,
    direccionEnvio?: string,
    metodoPago?: string,
    estadoEntrega?: string,
    fecha?: string,
    ordenDetalle?: OrdenDetalleDto[]
}

export interface OrdenDetalleDto {
    id?: number,
    idProducto?: number,
    usuario?: string,
    cantidad?: number,
    precio?: DoubleRange,
    subtotal?: DoubleRange,
    iva?: DoubleRange,
    total?: DoubleRange,
    fecha?: string
}