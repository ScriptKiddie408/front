import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';

import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import {Patient} from "../patient"
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EXAMPLE_DATA} from './data-table-datasource'

export interface UserData{
  snils: string;
  surname: string;
  name: string;
  patronymic: string;
  date_of_birth: string;
  gender: string;
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  dataSource!: MatTableDataSource<UserData>;

  users!: Observable<Patient[]>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['snils', 'surname', 'name', 'patronymic', 'date_of_birth', 'gender'];

  constructor(private userService:UserService, private router: Router) {
    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);
  }

  ngOnInit() {
      // this.reloadData();
  }

  // reloadData() {
  //   this.users = this.userService.getUsersList();
  // }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
