import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { PlantillasComponent } from '../plantillas/plantillas.component';
import { PlantillasHomeComponent } from '../plantillas/plantillas-home/plantillas-home.component';
import { PlantillaEditorComponent } from '../plantillas/plantilla-editor/plantilla-editor.component';
import { PlantillaViewerComponent } from '../plantillas/plantilla-viewer/plantilla-viewer.component';
import { VialesComponent } from '../viales/viales.component';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { CampaniaComponent } from '../campania/campania.component';
import { CrearRespuestaComponent } from '../crear-respuesta/crear-respuesta.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: ':id/viales', component: VialesComponent },
    {
        path: 'programas',
        component: CampaniaComponent
        // children: [{ path: ':id/viales', component: VialesComponent }]
    },
    { path: 'programas/:id/viales', component: VialesComponent },
    { path: 'crearRespuesta', component: CrearRespuestaComponent },
    {
        path: 'plantillas',
        component: PlantillasComponent,
        children: [
            { path: '', component: PlantillasHomeComponent },
            {
                path: 'plantilla-editor/:id',
                component: PlantillaEditorComponent
            },
            { path: 'plantilla-viewer', component: PlantillaViewerComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
