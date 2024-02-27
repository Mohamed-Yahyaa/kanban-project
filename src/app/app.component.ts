import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
// import { kanbanData } from './datasource';
import { CardSettingsModel,  } from '@syncfusion/ej2-angular-kanban';


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
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  columns = [
    { headerText: 'To do', keyField: 'Open', allowToggle: true },
    { headerText: 'In Progress', keyField: 'InProgress', allowToggle: true },
    { headerText: 'Testing', keyField: 'Testing', allowToggle: true },
    { headerText: 'Done', keyField: 'Close', allowToggle: true }
  ];

onColumnDrop(event: CdkDragDrop<any[]>): void {
  moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
}

   data: any[] = [
    {
      "Id": "Task 1",
      "Title": "Task - 29001",
      "Status": "Close",
      "Summary": " issues reported by the customer.",
      "Type": "Story",
      "Priority": "High",
      "Estimate": 1,
      "Assignee": "Steven walker"
  },

  {
    "Id": "Task 2",
    "Title": "Task - 29002",
    "Status": "Close",
    "Summary": "  the customer.",
    "Type": "Story",
    "Priority": "High",
    "Estimate": 1,
    "Assignee": "Steven walker"
},

{
  "Id": "Task 3",
  "Title": "Task - 29003",
  "Status": "Testing",
  "Summary": "  the test and customer.",
  "Type": "Story",
  "Priority": "High",
  "Estimate": 1,
  "Assignee": "Steven walker"
},

{
  "Id": "Task 4",
  "Title": "Task - 29004",
  "Status": "Close",
  "Summary": "  test this part in task .",
  "Type": "Story",
  "Priority": "High",
  "Estimate": 1,
  "Assignee": "Steven walker"
},

{
  "Id": "Task 5",
  "Title": "Task - 29005",
  "Status": "Close",
  "Summary": "  test this part in task and i need complete  .",
  "Type": "Story",
  "Priority": "High",
  "Estimate": 1,
  "Assignee": "Steven walker"
},

{
    "Id": "Task 6",
    "Title": "Task - 29006",
    "Status": "Testing",
    "Summary": "Testing new requirements",
    "Type": "Improvement",
    "Priority": "Low",
    "Estimate": 1.5,
    "Assignee": "Robert King"
},

{
  "Id": "Task 7",
  "Title": "Task - 29007",
  "Status": "Testing",
  "Summary": "  test this part in task and i need complete  .",
  "Type": "Story",
  "Priority": "High",
  "Estimate": 1,
  "Assignee": "Steven walker"
},

{
    "Id": "Task 8",
    "Title": "Task - 29008",
    "Status": "InProgress",
    "Summary": "Test the application in the IE browser.",
    "Type": "Story",
    "Priority": "Low",
    "Estimate": 5.5,
    "Assignee": "Margaret hamilt"
},
{
    "Id": "Task 9",
    "Title": "Task - 29009",
    "Status": "InProgress",
    "Summary": "Testing the issues reported by the customer.",
    "Type": "Story",
    "Priority": "High",
    "Estimate": 1,
    "Assignee": "Steven walker"
},
{
    "Id": "Task 10",
    "Title": "Task - 29010",
    "Status": "Open",
    "Summary": "Show the retrieved data from the server in grid control.",
    "Type": "Story",
    "Priority": "High",
    "Estimate": 5.5,
    "Assignee": "Margaret hamilt"
},
{
  "Id": "Task 11",
  "Title": "Task - 29011",
  "Status": "Open",
  "Summary": "Show the retrieved data ",
  "Type": "Story",
  "Priority": "High",
  "Estimate": 5.5,
  "Assignee": "Margaret hamilt"
},
{
  "Id": "Task 12",
  "Title": "Task - 29012",
  "Status": "Open",
  "Summary": "Show the retrieved data ",
  "Type": "Story",
  "Priority": "High",
  "Estimate": 5.5,
  "Assignee": "Margaret hamilt"
},
{
  "Id": "Task 13",
  "Title": "Task - 29013",
  "Status": "Open",
  "Summary": "Show the retrieved data ",
  "Type": "Story",
  "Priority": "High",
  "Estimate": 5.5,
  "Assignee": "Margaret hamilt"
},
{
  "Id": "Task 14",
  "Title": "Task - 29013",
  "Status": "Open",
  "Summary": "Show the retrieved data ",
  "Type": "Story",
  "Priority": "High",
  "Estimate": 5.5,
  "Assignee": "Margaret hamilt"
},
{
  "Id": "Task 14",
  "Title": "Task - 29013",
  "Status": "Open",
  "Summary": "Show the retrieved data ",
  "Type": "Story",
  "Priority": "High",
  "Estimate": 5.5,
  "Assignee": "Margaret hamilt"
},
];


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

addColumn(): void {
  const columnName = prompt('Enter the name:');
  if (columnName) {
    const position = Number(prompt('Enter the index position :'));
    if (position >= 1 && position <= 8) {
      const newColumn = {
        headerText: columnName,
        keyField: columnName.replace(/\s/g, ''),
        allowToggle: true
      };
      this.columns.splice(position - 1, 0, newColumn);
    } else {
      alert('Invalid index position. Column not added.');
    }
  }
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

// public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' ,   allowDragAndDrop: true};



}
