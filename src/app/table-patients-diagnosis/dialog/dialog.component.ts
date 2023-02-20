import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  diagForm=this.fb.group({
    diagnosis: [null, Validators.required],
    complications_diagnosis: [null, Validators.required],
    concomitant_diseases: [null, Validators.required],
  })
  constructor(private fb: FormBuilder, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

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
  CloseClick(){
    this.dialog.closeAll()
  }
}
