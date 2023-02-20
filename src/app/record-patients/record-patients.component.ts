import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import axios from 'axios';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-record-patients',
  templateUrl: './record-patients.component.html',
  styleUrls: ['./record-patients.component.css']
})
export class RecordPatientsComponent {
  addressForm = this.fb.group({
    snils: [null, Validators.required],
    surname: [null, Validators.required],
    name: [null, Validators.required],
    patronymic: [null, Validators.required],
    date_of_birth: [null, Validators.required],
    gender: [null, Validators.required],
    diagnosis: [null, Validators.required],
    complications_diagnosis: [null, Validators.required],
    concomitant_diseases: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required],
    researches: [null, Validators.required]
  });

  
  getPat(){
    let snilsValue = (<HTMLInputElement>document.getElementById("snils"));
    let surnameValue = (<HTMLInputElement>document.getElementById("surname"));
    let nameValue = (<HTMLInputElement>document.getElementById("name"));
    let patronymicValue = (<HTMLInputElement>document.getElementById("patronymic"));
    let date_of_birthValue = (<HTMLInputElement>document.getElementById("date_of_birth"));
    let genderValue = (<HTMLInputElement>document.getElementById("gender"));

    axios.post('http://localhost:8080/users/add',{
      snils: Number(snilsValue),
      surname: String(surnameValue),
      name: String(nameValue),
      patronymic: String(patronymicValue),
      date_of_birth: String(date_of_birthValue),
      gender: String(genderValue)
    }).then(function(respose) {})
    .catch(function(error) {
      console.log(error)
    });
  }
  

  hasUnitNumber = false;

  states = [
    {nameG: 'М'},
    {nameG: 'Ж'}
  ];
  
  statesDp = [
    {nameDp: 'F00'},
    {nameDp: 'F01'},
    {nameDp: 'F02'},
    {nameDp: 'F03'},
    {nameDp: 'F04'},
    {nameDp: 'F05'},
    {nameDp: 'F06'},
    {nameDp: 'F07'},
    {nameDp: 'F08'},
    {nameDp: 'F09'}
  ]
  
  statesDc1 = [
    {nameDc: 'F00.0'},
    {nameDc: 'F00.1'},
    {nameDc: 'F00.2'},
    {nameDc: 'F00.9'}
  ]
  constructor(private fb: FormBuilder) {}
  
  onSubmit(): void {
    alert('Thanks!');
    axios.post('http://localhost:8080/users/add',{
      snils: 99999999999,
      surname: "тест",
      name: "тест",
      patronymic: "тест",
      date_of_birth: 1999-1-12,
      gender: "м"
    }).then(function(respose) {})
    .catch(function(error) {
      console.log(error)
    });
  }
}
