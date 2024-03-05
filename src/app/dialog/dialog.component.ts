import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  newTask: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


isLinear: any;
  stepper: any;


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.newTask = { ...this.data }; // Create a copy of the data object

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [this.newTask.Status, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [this.newTask.Summary, Validators.required]
    });
  }

  saveChanges(): void {
    const newStatus = this.firstFormGroup.get('firstCtrl')?.value;
    const newSummary = this.secondFormGroup.get('secondCtrl')?.value;

    this.newTask.Status = newStatus;
    this.newTask.Summary = newSummary;

    this.dialogRef.close(this.newTask);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getStepIndex(status: string): number {
    switch (status) {
      case 'Open':
        return 0;
      case 'InProgress':
        return 1;
      case 'Testing':
        return 2;
      case 'Close':
        return 3;
      default:
        return 0;
    }
  }

  updateStepIndex(): void {
    const selectedIndex = this.getStepIndex(this.newTask.Status);
    if (selectedIndex >= 0) {
      this.stepper.selectedIndex = selectedIndex;
    }
  }
}
