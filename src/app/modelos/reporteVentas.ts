export interface ReporteVentasDto {
    id?: number,
    orden?: number;
    cliente?: string;
    producto?: string;
    cantidad?: number;
    precio?: DoubleRange;
    subtotal?: DoubleRange;
    iva?: DoubleRange;
    total?: DoubleRange;
    fecha?: string;
}
