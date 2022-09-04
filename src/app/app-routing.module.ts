import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoCategoriaComponent } from './componentes/administrador/producto-categoria/producto-categoria.component';
import { ProveedoresRepartidoresComponent } from './componentes/administrador/proveedores-repartidores/proveedores-repartidores.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { ContenidoComponent } from './componentes/contenido/contenido.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { OrdenDetalleComponent } from './componentes/orden-detalle/orden-detalle.component';
import { PromocionesComponent } from './componentes/promociones/promociones.component';
import { RepartidorComponent } from './componentes/repartidor/repartidor.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { TiendaComponent } from './componentes/tienda/tienda.component';
import { ProdGuardService } from './guards/prod-guard.service';
import { PagarComponent } from './tienda/pagar/pagar.component';

const routes: Routes = [
  { path: '', component: ContenidoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'repartidor/ordenes', component: RepartidorComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'delivery'] } },
  { path: 'repartidor/ordenes/orden/:id', component: OrdenDetalleComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'delivery'] } },
  { path: 'tienda/pagar', component: PagarComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'admin/productos-categorias', component: ProductoCategoriaComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
  { path: 'admin/reportes', component: ReportesComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
  { path: 'admin/promociones', component: PromocionesComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
  { path: 'admin/proveedores-repartidores', component: ProveedoresRepartidoresComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

