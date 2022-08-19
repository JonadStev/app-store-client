export interface ProductoDto {
    id?: number,
    nombre?: string,
    precio?: DoubleRange,
    stock?: number,
    srcImage?: string,
    estado?: string,
    categoria?: Categoria
}

export interface Categoria {
    id: number,
    nombreCategoria: string
}