import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Bootstrap4FrameworkModule } from 'angular6-json-schema-form';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

// Bootstrap modules, help to use bootstrap js without having jquery.
// Ref: https://loiane.com/2017/08/how-to-add-bootstrap-to-an-angular-cli-project/#3-importing-the-css
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { PlantillasComponent } from './plantillas/plantillas.component';
import { PlantillaEditorComponent } from './plantillas/plantilla-editor/plantilla-editor.component';
import { PlantillaViewerComponent } from './plantillas/plantilla-viewer/plantilla-viewer.component';
import { PlantillasHomeComponent } from './plantillas/plantillas-home/plantillas-home.component';
import { TablaRamComponent } from './tabla-ram/tabla-ram.component';
import { TablaPruebasbioquimicasComponent } from './tabla-pruebasbioquimicas/tabla-pruebasbioquimicas.component';
import { TipoPreguntaComponent } from './tipo-pregunta/tipo-pregunta.component';
import { AgregarSeccionComponent } from './agregar-seccion/agregar-seccion.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
// import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CampaniaComponent } from './campania/campania.component';
import { EditarPlantillaComponent } from './plantillas/editar-plantilla/editar-plantilla.component';
// import { environment } from '../../environments/environment';
// import { AppEffects } from './store/effects/app.effects';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PlantillasComponent,
    PlantillaEditorComponent,
    PlantillaViewerComponent,
    PlantillasHomeComponent,
    TablaRamComponent,
    TablaPruebasbioquimicasComponent,
    TipoPreguntaComponent,
    AgregarSeccionComponent,
    CampaniaComponent,
    EditarPlantillaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    Bootstrap4FrameworkModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    SweetAlert2Module.forRoot({
      buttonsStyling: true,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-secondary'
    })
    //    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
export class AppBootstrapModule {}
