import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Data } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// import { kanbanData } from './datasource';
import {
  CardSettingsModel,
  ColumnDirective,
  DialogEventArgs,
  DialogSettingsModel,
  KanbanComponent,
  KanbanModule,
} from '@syncfusion/ej2-angular-kanban';
import { DialogComponent } from './dialog/dialog.component';
import { ActionBeginEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { data } from './data';
import { StepperComponent } from './stepper/stepper.component';

@Component({
  selector: 'app-root',
  //   template: `<ejs-kanban>
  //   <e-columns>
  //       <e-column headerText='To do' keyField='Open'></e-column>
  //       <e-column headerText='In Progress' keyField='InProgress'></e-column>
  //       <e-column headerText='Testing' keyField='Testing'></e-column>
  //       <e-column headerText='Done' keyField='Close'></e-column>
  //   </e-columns>
  // </ejs-kanban>`,

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // ngOnInit() {
  //   const savedData = localStorage.getItem('kanbanData');
  //   if (savedData) {
  //     this.columns = JSON.parse(savedData);
  //   }
  // }

  newTask: any = {
    Id: '',
    Title: '',
    Status: '',
    Summary: '',
    Type: '',
    Priority: '',
    Estimate: '',
    Assignee: '',
    // Add other properties here
  };


  @ViewChild("kanbanObj") kanbanObj: KanbanComponent;
  columns = [
    { headerText: 'To do', keyField: 'Open', allowToggle: true, Data : [] },
    { headerText: 'In Progress', keyField: 'InProgress', allowToggle: true,Data : []  },
    { headerText: 'Testing', keyField: 'Testing', allowToggle: true ,Data : []  },
    { headerText: 'Done', keyField: 'Close', allowToggle: true ,Data : []  }
  ];

  data = data;


  constructor(private dialog: MatDialog) {
  }

  switchColumn(sourceColumnIndex: number, targetColumnIndex: number): void {
    const sourceColumn = this.kanbanObj.columns[sourceColumnIndex];
    if (sourceColumn) {
      this.kanbanObj.columns[sourceColumnIndex] =
        this.kanbanObj.columns[targetColumnIndex];
      this.kanbanObj.columns[targetColumnIndex] = sourceColumn;
      this.kanbanObj.columns = [...this.kanbanObj.columns];
    }
  }

  openDialog(): void {
  const dialogRef = this.dialog.open(DialogComponent, {
  width: '400px', // Adjust the width as per your requirement
  data: {} // Pass any data you need to the dialog component
  });

  dialogRef.afterClosed().subscribe(result => {
  // Handle the result after the dialog is closed
  });
  }

  openDial(data): void {
    const dialogRef = this.dialog.open(StepperComponent, {
    width: '400px', // Adjust the width as per your requirement
    data: {} // Pass any data you need to the dialog component
    });

    dialogRef.afterClosed().subscribe(result => {
    // Handle the result after the dialog is closed
    });
    }


  changePositionIndex(column: any): void {
    const newPosition = prompt('Enter the new position index for the column:');
    if (newPosition !== null) {
      const targetIndex = parseInt(newPosition, 10);
      if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < this.columns.length) {
        const currentIndex = this.columns.indexOf(column);
        if (currentIndex !== targetIndex) {
          this.switchColumn(currentIndex, targetIndex);
        }
      } else {
        alert('Invalid position index!');
      }
    }
  }

  isFormValid(): boolean {
    return this.newTask.Title.trim().length > 0 && this.newTask.Status.trim().length > 0;
    // Add other validation rules for remaining properties if needed
  }
  getTaskCount(keyField: string): number {
    return this.data.filter(task => task.Status === keyField).length;
  }

  removeColumn(column: any): void {
    const index = this.columns.indexOf(column);
    if (index > -1) {
      this.columns.splice(index, 1);
    }
  }

  modifyColumnTitle(column: any): void {
    const newTitle = prompt('new column title:', column.headerText);
    if (newTitle) {
      column.headerText = newTitle;
    }
  }

  toggleDeleteButtonsVisibility(): void {
    this.columns.forEach((column: any) => {
      column.showDeleteButton = !column.showDeleteButton;
    });
  }

  addColumn(): void {
    const columnName = prompt('Enter the name of the column:');
    if (columnName) {
      const targetColumnIndex = this.columns.findIndex(column => column.headerText === columnName);
      const newColumn = {
        headerText: columnName,
        keyField: columnName.replace(/\s/g, ''),
        allowToggle: true,
        Data: []
      };
      if (targetColumnIndex === -1) {
        const position = prompt('Enter the name of the column before which you want to add the new column:');
        const insertIndex = this.columns.findIndex(column => column.headerText === position);
        if (insertIndex !== -1) {
          this.columns.splice(insertIndex, 0, newColumn);
        } else {
          this.columns.push(newColumn);
        }
      }
    }
  }

  submitForm(): void {
    if (this.isFormValid()) {
      this.data.push({...this.newTask});
      // Save the updated data to localStorage
      localStorage.setItem('kanbanData', JSON.stringify(this.data));

      // Reset the form
      this.newTask = {};
    }
    console.log(this.newTask)
  }

  taskCount: number = 0;
  inCount() {
    this.taskCount++;
  }
  title = 'kanban-project';
  public cardSettings: CardSettingsModel = {
    contentField: 'Summary',
    headerField: 'Id'
  };

  handleActionBegin(event: DialogEventArgs){
    event.cancel = true;
    const {data}= event;
    this.openDial(data)
  }

  // public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' ,   allowDragAndDrop: true};
}
