import { CarritoDto } from "./carrito";

export interface OrdenDto {
    direccionEnvio?: string,
    metodoPago?: string,
    estadoPedido?: string,
    usuario?: string,
    carrito?: CarritoDto[]
}