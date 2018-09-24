import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { Bootstrap4FrameworkModule } from 'angular6-json-schema-form';

//Bootstrap modules, help to use bootstrap js without having jquery.
//Ref: https://loiane.com/2017/08/how-to-add-bootstrap-to-an-angular-cli-project/#3-importing-the-css
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
    TipoPreguntaComponent
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
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
export class AppBootstrapModule { }

