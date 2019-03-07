import { WidgetsModule } from './../widgets/widgets.module';
import { FileInfo } from '../models/file-info.model';
import { ROUTES } from './upload.routes';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMainComponent } from './views/upload-main/upload-main.component';
import { MaterialModule } from '../material/material.module';
import { UploadFilesService } from '../services/upload-files.service';
import { RouterModule } from '@angular/router';
import { FileTableComponent } from './components/file-table/file-table.component';
import { UploadDialogueComponent } from './components/upload-dialogue/upload-dialogue.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { saveAs } from 'file-saver';

@NgModule({
  entryComponents: [UploadDialogueComponent],
  declarations: [
    UploadMainComponent,
    FileTableComponent,
    UploadDialogueComponent,
    UploadFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    WidgetsModule
    // saveAs
  ],
  providers: [UploadFilesService]
})
export class UploadModule {}
