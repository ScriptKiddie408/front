import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { RecordPatientsComponent } from './record-patients/record-patients.component';
import { TablePatientsDiagnosisComponent } from './table-patients-diagnosis/table-patients-diagnosis.component';

const routes: Routes = [
  {
    path:'', component: LoginComponent 
  },
  {
    path:'home',component:NavComponent,children:[
      {path:'results_research',component:TablePatientsDiagnosisComponent},
      {path:'patients',component:DataTableComponent},
      {path:'record', component:RecordPatientsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
