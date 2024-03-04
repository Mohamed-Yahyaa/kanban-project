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

import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogComponent } from './dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [
    AppComponent,
    DragComponent,
    DialogComponent,



  ],
  imports: [
    BrowserModule, KanbanModule, BrowserAnimationsModule,
    MatMenuModule, MatIconModule, MatButtonModule,
    MatBadgeModule ,DragDropModule ,FormsModule,MatDialogModule,
    MatInputModule,    MatFormFieldModule
    ,MatSelectModule,DropDownListModule,MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
