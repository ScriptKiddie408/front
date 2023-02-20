import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from './patient';

@Injectable()

export class UserService {
    private baseUrl = 'http://localhost:8080/users/gimme';

    constructor(private http: HttpClient) { }

    getUsers(){
        return this.http.get<Array<Patient>>(this.baseUrl);
    }

    createUser(user: Object): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, user);
    }
    
    // getUsersList(): Observable<any> {
    //     return this.http.get(`${this.baseUrl+'/gimme'}`);
    // }


}