import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { DragComponent } from './drag/drag.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StepperModule, StepperAllModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    DragComponent,
    DialogComponent,

  ],
  imports: [
    BrowserModule, KanbanModule, BrowserAnimationsModule,
    MatMenuModule, MatIconModule, MatButtonModule,
    MatBadgeModule ,DragDropModule ,StepperModule, StepperAllModule,FormsModule,MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
