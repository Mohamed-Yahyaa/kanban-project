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




  public data: Object[] = [  {
    "Id": "Task 1",
    "Title": "Task - 29001",
    "Status": "Open",
    "Summary": "Analyze the new requirements gathered from the customer.",
    "Type": "Story",
    "Priority": "Low",
    "Estimate": 3.5,
    "Assignee": "Nancy Davloio"
},
{
    "Id": "Task 2",
    "Title": "Task - 29002",
    "Status": "In Progress",
    "Summary": "Improve application performance",
    "Type": "Improvement",
    "Priority": "Normal",
    "Estimate": 6,
    "Assignee": "Andrew Fuller"
},
{
  "Id": "Task 9",
  "Title": "Task - 29009",
  "Status": "In Progress",
  "Summary": "Improve application ",
  "Type": "Improvement",
  "Priority": "Normal",
  "Estimate": 6,
  "Assignee": "Andrew Fuller"
},
{
  "Id": "Task 11",
  "Title": "Task - 29011",
  "Status": "In Progress",
  "Summary": "Improve performance",
  "Type": "Improvement",
  "Priority": "Normal",
  "Estimate": 6,
  "Assignee": "Andrew Fuller"
},
{
    "Id": "Task 3",
    "Title": "Task - 29003",
    "Status": "Open",
    "Summary": "Arrange a web meeting with the customer to get new requirements.",
    "Type": "Others",
    "Priority": "Critical",
    "Estimate": 5.5,
    "Assignee": "Janet Leverling"
},
{
    "Id": "Task 4",
    "Title": "Task - 29004",
    "Status": "In Progress",
    "Summary": "Fix the issues reported in the IE browser.",
    "Type": "Bug",
    "Priority": "Critical",
    "Estimate": 2.5,
    "Assignee": "Janet Leverling"
},
{
    "Id": "Task 5",
    "Title": "Task - 29005",
    "Status": "Review",
    "Summary": "Fix the issues reported by the customer.",
    "Type": "Bug",
    "Priority": "Low",
    "Estimate": "3.5",
    "Assignee": "Steven walker"
},
{
    "Id": "Task 6",
    "Title": "Task - 29007",
    "Status": "Testing",
    "Summary": "Testing new requirements",
    "Type": "Improvement",
    "Priority": "Low",
    "Estimate": 1.5,
    "Assignee": "Robert King"
},
{
    "Id": "Task 7",
    "Title": "Task - 29009",
    "Status": "Review",
    "Summary": "Fix the issues reported in Safari browser.",
    "Type": "Bug",
    "Priority": "Critical",
    "Estimate": 1.5,
    "Assignee": "Nancy Davloio"
},
{
    "Id": "Task 8",
    "Title": "Task - 29010",
    "Status": "Close",
    "Summary": "Test the application in the IE browser.",
    "Type": "Story",
    "Priority": "Low",
    "Estimate": 5.5,
    "Assignee": "Margaret hamilt"
},
{
    "Id": "Task 9",
    "Title": "Task - 29011",
    "Status": "Testing",
    "Summary": "Testing the issues reported by the customer.",
    "Type": "Story",
    "Priority": "High",
    "Estimate": 1,
    "Assignee": "Steven walker"
},
{
    "Id": "Task 10",
    "Title": "Task - 29015",
    "Status": "Open",
    "Summary": "Show the retrieved data from the server in grid control.",
    "Type": "Story",
    "Priority": "High",
    "Estimate": 5.5,
    "Assignee": "Margaret hamilt"
}
];


removeColumn(column: any): void {
  const index = this.columns.indexOf(column);
  if (index > -1) {
    this.columns.splice(index, 1);
  }
}

modifyColumnTitle(column: any): void {
  const newTitle = prompt('Enter the new column title:', column.headerText);
  if (newTitle) {
    column.headerText = newTitle;
  }
}

addColumn(): void {
  const columnName = prompt('Enter the name:');
  if (columnName) {
    const newColumn = {
      headerText: columnName,
      keyField: columnName.replace(/\s/g, ''),
      allowToggle: true
    };
    this.columns.push(newColumn);
  }
}
  title = 'kanban-project';
  public cardSettings: CardSettingsModel = {
    contentField: 'Summary',
    headerField: 'Id'
};

// public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' ,   allowDragAndDrop: true};



}
