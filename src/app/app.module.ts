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
import { GalleriaModule } from 'primeng/galleria';
import { ToastModule } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { TiendaComponent } from './componentes/tienda/tienda.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';
import { ProductoCategoriaComponent } from './componentes/administrador/producto-categoria/producto-categoria.component';
import { ProveedoresRepartidoresComponent } from './componentes/administrador/proveedores-repartidores/proveedores-repartidores.component';
import { MessageService } from 'primeng/api';
import { PagarComponent } from './tienda/pagar/pagar.component';
import { RepartidorComponent } from './componentes/repartidor/repartidor.component';
import { OrdenDetalleComponent } from './componentes/orden-detalle/orden-detalle.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { PromocionesComponent } from './componentes/promociones/promociones.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ContenidoComponent,
    NosotrosComponent,
    ContactoComponent,
    TiendaComponent,
    ProductoCategoriaComponent,
    ProveedoresRepartidoresComponent,
    PagarComponent,
    RepartidorComponent,
    OrdenDetalleComponent,
    ReportesComponent,
    PromocionesComponent,
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
    DropdownModule,
    GalleriaModule,
    ToastModule,
    DataViewModule,
    MessagesModule,
    MessageModule,
    CalendarModule
  ],
  providers: [interceptorProvider, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
