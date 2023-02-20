import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TablePatientsDiagnosisDataSource, TablePatientsDiagnosisItem, EXAMPLE_DATA } from '../table-patients-diagnosis/table-patients-diagnosis-datasource';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface UserData{
  snils: number;
  surname: string;
  name: string;
  patronymic: string;
  date_of_birth: string;
  gender: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})



export class NavComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TablePatientsDiagnosisItem>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    dataSource!: MatTableDataSource<UserData>; 
  
    constructor(private breakpointObserver: BreakpointObserver, private dialog : MatDialog) {
      this.dataSource = new MatTableDataSource(EXAMPLE_DATA);
    }
    
    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }
}
