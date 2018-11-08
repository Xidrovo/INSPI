import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { PlantillasComponent } from '../plantillas/plantillas.component';
import { PlantillasHomeComponent } from '../plantillas/plantillas-home/plantillas-home.component';
import { PlantillaEditorComponent } from '../plantillas/plantilla-editor/plantilla-editor.component';
import { PlantillaViewerComponent } from '../plantillas/plantilla-viewer/plantilla-viewer.component';
import { NgReduxModule, NgRedux } from '@angular-redux/store'
import { CampaniaComponent } from '../campania/campania.component';

const routes: Routes = [           
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent},
    { path: 'programas', component: CampaniaComponent},
    {
      path: 'plantillas', 
      component: PlantillasComponent,
      children: [            
          {path: '', component: PlantillasHomeComponent },
          {path: 'plantilla-editor/:id', component: PlantillaEditorComponent },
          {path: 'plantilla-viewer', component: PlantillaViewerComponent },
          {path: '**', redirectTo: '', pathMatch: 'full'}
      ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }