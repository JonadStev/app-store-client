import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoCategoriaComponent } from './componentes/administrador/producto-categoria/producto-categoria.component';
import { ProveedoresRepartidoresComponent } from './componentes/administrador/proveedores-repartidores/proveedores-repartidores.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { ContenidoComponent } from './componentes/contenido/contenido.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { TiendaComponent } from './componentes/tienda/tienda.component';
import { ProdGuardService } from './guards/prod-guard.service';
import { PagarComponent } from './tienda/pagar/pagar.component';

const routes: Routes = [
  { path: '', component: ContenidoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'tienda/pagar', component: PagarComponent },
  { path: 'admin/productos-categorias', component: ProductoCategoriaComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
  { path: 'admin/proveedores-repartidores', component: ProveedoresRepartidoresComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
