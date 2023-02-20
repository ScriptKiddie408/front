import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { filter } from 'rxjs/operators';
import { TablePatientsDiagnosisDataSource, TablePatientsDiagnosisItem, EXAMPLE_DATA } from './table-patients-diagnosis-datasource';
import { MatTableDataSource } from '@angular/material/table';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

export interface UserData{
  snils: number;
  surname: string;
  name: string;
  patronymic: string;
  date_of_birth: string;
  gender: string;
}
@Component({
  selector: 'app-table-patients-diagnosis',
  templateUrl: './table-patients-diagnosis.component.html',
  styleUrls: ['./table-patients-diagnosis.component.css'],

})

export class TablePatientsDiagnosisComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TablePatientsDiagnosisItem>;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['snils', 'surname', 'name', 'patronymic', 'date_of_birth', 'gender', 'getdetails'];
  dataSource!: MatTableDataSource<UserData>; 
  constructor(private dialog : MatDialog) {
    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  // dataSource1 = new MatTableDataSource(EXAMPLE_DATA);

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()
  
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  } 
  openDialog(){
    this.dialog.open(DialogComponent,{
      width:'30%'
    });
  }
}


