import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';

// TODO: Replace this with your own data model type
export interface TablePatientsDiagnosisItem {
  snils: number;
  surname: string;
  name: string;
  patronymic: string;
  date_of_birth: string;
  gender: string;
}

// TODO: replace this with real data from your application
export const EXAMPLE_DATA: TablePatientsDiagnosisItem[] = [];

axios.get('http://localhost:8080/users/gimme').then(function(response){
  let list: string[] = response.data
  let length = list.length
  for(var i=0;i<length;i++){
    var snils =Number(Object.values(list[i])[0])
    var surname = Object.values(list[i])[1]
    var name = Object.values(list[i])[2]
    var patronymic = Object.values(list[i])[3]
    var date_of_birth = Object.values(list[i])[4]
    var gender = Object.values(list[i])[5]
    EXAMPLE_DATA.push({snils, surname,name,patronymic,date_of_birth,gender})
  }
}).catch(function (error){
  console.log(error)
});


//   {snils: 1, surname: 'Hydrogen', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 2, surname: 'Helium', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 3, surname: 'Lithium', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 4, surname: 'Beryllium', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 5, surname: 'Boron', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 6, surname: 'Carbon', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 7, surname: 'Nitrogen', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 8, surname: 'Oxygen', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 9, surname: 'Fluorine', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 10, surname: 'Neon', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 11, surname: 'Sodium', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 12, surname: 'Magnesium', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 13, surname: 'Aluminum', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 14, surname: 'Silicon', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 15, surname: 'Phosphorus', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 16, surname: 'Sulfur', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 17, surname: 'Chlorine', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 18, surname: 'Argon', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 19, surname: 'Potassium', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
//   {snils: 20, surname: 'Calcium', name: 'Hydrogen', patronymic: 'Hydrogen', date_of_birth: 'Hydrogen', gender: 'Hydrogen'},
// ];

// @Component({
//   selector: 'app-table-patients-diagnosis',
//   templateUrl: './table-patients-diagnosis.component.html',
//   styleUrls: ['./table-patients-diagnosis.component.css']
// })
/**
 * Data source for the TablePatientsDiagnosis view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TablePatientsDiagnosisDataSource extends DataSource<TablePatientsDiagnosisItem> {
  data: TablePatientsDiagnosisItem[] = EXAMPLE_DATA;
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
  connect(): Observable<TablePatientsDiagnosisItem[]> {
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
  private getPagedData(data: TablePatientsDiagnosisItem[]): TablePatientsDiagnosisItem[] {
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
  private getSortedData(data: TablePatientsDiagnosisItem[]): TablePatientsDiagnosisItem[] {
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
