import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Data } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// import { kanbanData } from './datasource';
import {
  CardSettingsModel,
  ColumnDirective,
  DataStateChangeEventArgs,
  DialogEventArgs,
  DialogSettingsModel,
  KanbanComponent,
  KanbanModule,
  SwimlaneSettingsModel,
} from '@syncfusion/ej2-angular-kanban';
import { DialogComponent } from './dialog/dialog.component';
import { ActionBeginEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { data } from './data';

import { Query } from '@syncfusion/ej2-data';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { AddComponent } from './add/add.component';

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

onActionBegin($event: any) {
throw new Error('Method not implemented.');
}


  newTask: any = {
    Id: '',
    Title: '',
    Status: '',
    Summary: '',
    Type: '',
    Priority: '',
    Estimate: '',
    Assignee: '',

  };


  @ViewChild("kanbanObj") kanbanObj: KanbanComponent;
  columns = [
    { headerText: 'To do', keyField: 'Open', allowToggle: true, position: 0 },
    { headerText: 'In Progress', keyField: 'InProgress', allowToggle: true, position: 1  },
    { headerText: 'Testing', keyField: 'Testing', allowToggle: true , position: 2 },
    { headerText: 'Done', keyField: 'Close', allowToggle: true, position: 3   }
  ];

  data = data;
  // data:any[]= [];
  Status: any;
  Summary: any;
firstCtrl: any;
secondCtrl: any;
isLinear: any;

StartDate: Date;
EndDate: Date;
 taskUpdated: any;
taskIndex: number;
dialogSettings: any;
editSettings: any;



  constructor(private dialog: MatDialog ) {

  }
    ngOnInit() {
    const savedData = localStorage.getItem('kanbanData');
    const savedColumns = localStorage.getItem("kanbanColumns");
    const savedDuration = localStorage.getItem('taskDuration');
    if (savedData) {


        if(savedColumns){
          this.columns = JSON.parse(savedColumns);
        }
        this.reorderColumns();

    }
    console.log('Saved Task Duration:', savedDuration);
  }



  daysSinceStart( StartDate: Date): number {
    const today = new Date();
    const start = StartDate ? new Date(StartDate) : new Date();
    const timeDiff = Math.abs(today.getTime() - start.getTime());
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return days;
  }

  updateTask(data): void {
    if (data.StartDate) {
      const today = new Date();
      const startDate = new Date(data.StartDate);

      if (startDate > today) {
        data.status = 'Inactive';
      } else {
        data.status = 'Active';

        if (!this.taskUpdated) {
          this.taskUpdated = true;
          this.StartDate = new Date();
        }
      }
    } else {
      data.status = '';
    }
    localStorage.setItem('kanbanData', JSON.stringify(this.data));

  }


  switchColumn(sourceColumnIndex: number, targetColumnIndex: number): void {
    const sourceColumn = this.kanbanObj.columns[sourceColumnIndex];
    if (sourceColumn) {
      this.kanbanObj.columns[sourceColumnIndex] = this.kanbanObj.columns[targetColumnIndex];
      this.kanbanObj.columns[targetColumnIndex] = sourceColumn;
      this.kanbanObj.columns = [...this.kanbanObj.columns];
      console.log(this.kanbanObj.columns)
      localStorage.setItem('kanbanColumns', JSON.stringify(this.columns));
    }
  }
  reorderColumns(){
    if(!this.kanbanObj) return;
    console.log(this.kanbanObj.columns)
    const kanbanColumns = [...this.kanbanObj.columns]
    this.columns.forEach((column, index)=> {
      const kanbanColumnIndex = kanbanColumns.findIndex((c)=> c.keyField === column.keyField);
      if(kanbanColumnIndex !== -1) {
        const kanbanColumn = kanbanColumns.splice(kanbanColumnIndex, 1)[0];
        kanbanColumns.splice(index, 0, kanbanColumn);
      }
    });
    console.log(this.kanbanObj.columns, kanbanColumns)
    //this.kanbanObj.columns = [...kanbanColumns];
  }



  openDialog(item:any): void {
  const dialogRef = this.dialog.open(DialogComponent, {
  width: '1400px',
  data: item
  });

  dialogRef.afterClosed().subscribe(result => {

  if (result) {
    const index = this.data.findIndex((d) => d.Id === result.Id);

    if (index !== -1) {
      this.data[index] = result;
      this.data = this.data.concat()
      localStorage.setItem('kanbanData', JSON.stringify(this.data));
    }
  }

  });
  }

  Dialog() {
    const dialogRef = this.dialog.open(AddComponent,{
      width: '60rem',
      height: '27rem'

    });

    dialogRef.afterClosed().subscribe(result => {

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

  }
  getTaskCount(keyField: string): number {
    return this.data.filter(task => task.Status === keyField).length;
  }

  removeColumn(column: any): void {
    const index = this.columns.indexOf(column);
    if (index > -1) {
      this.columns.splice(index, 1);
      localStorage.setItem('kanbanColumns', JSON.stringify(this.columns));
    }
  }

  modifyColumnTitle(column: any): void {
    const newTitle = prompt('new column title:', column.headerText);
    if (newTitle) {
      column.headerText = newTitle;
      localStorage.setItem('kanbanColumns', JSON.stringify(this.columns));
    }
  }

  toggleDeleteButtonsVisibility(): void {
    this.columns.forEach((column: any) => {
      column.showDeleteButton = !column.showDeleteButton;
    });
    // localStorage.setItem('kanbanColumns', JSON.stringify(this.columns));
  }

  addColumn(): void {
    const columnName = prompt('Enter the name of the column:');
    if (columnName) {
      const targetColumnIndex = this.columns.findIndex(column => column.headerText === columnName);
      const newColumn = {
        headerText: columnName,
        keyField: columnName.replace(/\s/g, ''),
        allowToggle: true,
        Data: [],
        position: this.columns.length
      };
      if (targetColumnIndex === -1) {
        const position = prompt('Enter the name of the column before which you want to add the new column:');
        const insertIndex = this.columns.findIndex(column => column.headerText === position);
        if (insertIndex !== -1) {
          this.columns.splice(insertIndex, 0, newColumn);
        } else {
          this.columns.push(newColumn);
        }
        localStorage.setItem('kanbanColumns', JSON.stringify(this.columns));

      }
    }
  }

  TotalSalary(status:string): number {
    let total = 0;
    for (const employee of this.data) {
      if (employee.Status === status) {
        total += Number(employee.Salary);
      }
      // console.log(total)
    }
    return total;
  }


  submitForm(): void {
    if (this.isFormValid()) {
      this.data.push({...this.newTask});
      localStorage.setItem('kanbanData', JSON.stringify(this.data));
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
    headerField: 'Id',

  };
  // public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };
  // allowDragAndDrop: false


  handleActionBegin(event: DialogEventArgs){
    event.cancel = true;
    const {data}= event;
    this.openDialog(data)
    localStorage.setItem('kanbanData', JSON.stringify(data));
  }


  handleDataBound(event: any): void {
    const updatedData = this.kanbanObj.dataSource;
    localStorage.setItem('kanbanData', JSON.stringify(updatedData));
  }




  public swimlaneSettings: any = {
    keyField: 'Status',
    showItemCount: false,

    // headerPosition: 'Bottom'
};



public priorityData: string[] = ['','Open', 'InProgress', 'Testing','Close'];
change(args: ChangeEventArgs): void {
    let filterQuery: Query = new Query();
    if (args.value !== '') {
        filterQuery = new Query().where('Status', 'equal', args.value);
    }
    (this.kanbanObj as KanbanComponent).query = filterQuery;
}
}
