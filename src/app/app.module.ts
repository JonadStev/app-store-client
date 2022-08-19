import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ContenidoComponent } from './componentes/contenido/contenido.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { GMapModule } from 'primeng/gmap';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TiendaComponent } from './componentes/tienda/tienda.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';
import { ProductoCategoriaComponent } from './componentes/administrador/producto-categoria/producto-categoria.component';
import { ProveedoresRepartidoresComponent } from './componentes/administrador/proveedores-repartidores/proveedores-repartidores.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ContenidoComponent,
    NosotrosComponent,
    ContactoComponent,
    TiendaComponent,
    ProductoCategoriaComponent,
    ProveedoresRepartidoresComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    ImageModule,
    InputTextModule,
    SidebarModule,
    CardModule,
    CarouselModule,
    GMapModule,
    TableModule,
    DropdownModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
