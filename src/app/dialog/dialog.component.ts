import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwimlaneSettingsModel } from '@syncfusion/ej2-angular-kanban';

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
    this.newTask = { ...this.data };

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [this.newTask.Status, Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [this.newTask.Summary, Validators.required]
    });

    this.updateStepIndex();
  }

  saveChanges(): void {
    const newStatus = this.firstFormGroup.get('firstCtrl')?.value;
    const newSummary = this.secondFormGroup.get('secondCtrl')?.value;

    this.newTask.Summary = newSummary;

    localStorage.setItem('kanbanData', JSON.stringify(this.newTask));
    localStorage.setItem('kanbanData', JSON.stringify(this.data));



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


    localStorage.setItem('kanbanData', JSON.stringify(this.newTask));
    }
  }
  // onStatusChange(event: StepperSelectionEvent){
  //   const index = event.selectedIndex;
  //   this.newTask

  // }

  onStatusChange(event: StepperSelectionEvent): void {
    const index = event.selectedIndex;
    console.log('Index:', index);

    switch (index) {
      case 0:
        this.newTask.Status = 'Open';
        break;
      case 1:
        this.newTask.Status = 'InProgress';
        break;
      case 2:
        this.newTask.Status = 'Testing';
        break;
      case 3:
        this.newTask.Status = 'Close';
        break;
      default:
        break;
    }
    console.log('Status:', this.newTask.Status);

}

// public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };

}
