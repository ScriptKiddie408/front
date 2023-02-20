import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import axios from 'axios';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  snils: string;
  surname: string;
  name: string;
  patronymic: string;
  date_of_birth: string;
  gender: string;
}

// TODO: replace this with real data from your application
export const EXAMPLE_DATA: DataTableItem[] = [];

// const axios = require('axios');
// axios.get('http://localhost:8080/users/gimme').then(function(response){
//   let list: string[] = response.data
//   let length = list.length
//   for(var i=0;i<length;i++){
//     var snils = Object.values(list[i])[1]
//     var surname = Object.values(list[i])[2]
//     var name = Object.values(list[i])[3]
//     var patronymic = Object.values(list[i])[4]
//     var date_of_birth = Object.values(list[i])[5]
//     var gender = Object.values(list[i])[6]
//     EXAMPLE_DATA.push({snils, surname,name,patronymic,date_of_birth,gender})
//   }
// }).catch(function (error){
//   console.log(error)
// }).then(function (){})

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]): DataTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'snils': return compare(+a.snils, +b.snils, isAsc);
        case 'surname': return compare(a.surname, b.surname, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'patronymic': return compare(+a.patronymic, +b.patronymic, isAsc);
        case 'date_of_birth': return compare(a.date_of_birth, b.date_of_birth, isAsc);
        case 'gender': return compare(+a.gender, +b.gender, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
