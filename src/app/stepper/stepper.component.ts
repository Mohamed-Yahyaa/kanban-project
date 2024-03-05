import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<StepperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  openEditPopup() {
    document.getElementById("editPopup").style.display = "block";
  }

  closeEditPopup() {
    document.getElementById("editPopup").style.display = "none";
  }

  saveChanges() {
    const status = (document.getElementById("Status") as HTMLInputElement).value;
    const summary = (document.getElementById("Summary") as HTMLTextAreaElement).value;

    // Perform any necessary logic with the updated status and summary

    this.closeEditPopup();
  }
}
