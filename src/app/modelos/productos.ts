import { ProveedorDto } from "./ProveedorDTO"

export interface ProductoDto {
    id?: number,
    nombre?: string,
    precio?: DoubleRange,
    stock?: number,
    srcImage?: string,
    picByte?: string,
    estado?: string,
    categoria?: Categoria,
    proveedor?: ProveedorDto
}

export interface Categoria {
    id: number,
    nombreCategoria: string
}