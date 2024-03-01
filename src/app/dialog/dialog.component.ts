import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
newTask: any;


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  submitForm(): void {
    // Handle form submission logic here

    // Close the dialog after form submission
    this.dialogRef.close();
  }

  closeDialog(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }


}
