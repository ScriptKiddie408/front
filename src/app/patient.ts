import { Data } from "@angular/router";

export class Patient{
    constructor(public snils: string, public surname: string, public name: string, public patronymic: string,
        public date_of_birth: string, public gender: string,){

    }
    // snils!: string;
    // surname!: string;
    // name!: string;
    // patronymic!: string;
    // date_of_birth!: string;
    // gender!: string;
}

export interface Patients{
    snils: number;
    surname: string;
    name: string;
    patronymic: string;
    date_of_birth: string;
    gender: string;
}