import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { WidgetsModule } from './../widgets/widgets.module';
import { ROUTES } from './upload.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMainComponent } from './views/upload-main/upload-main.component';
import { MaterialModule } from '../material/material.module';
import { UploadFilesService } from '../services/upload-files.service';
import { RouterModule } from '@angular/router';
import { FileTableComponent } from './components/file-table/file-table.component';
import { UploadDialogueComponent } from './components/upload-dialogue/upload-dialogue.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { uploadReducers } from './store/upload.reducers';
import { UploadEffects } from './store/upload.effects';
import { StateDisplayComponent } from './components/state-display/state-display.component';

@NgModule({
  entryComponents: [UploadDialogueComponent],
  declarations: [
    UploadMainComponent,
    FileTableComponent,
    UploadDialogueComponent,
    UploadFormComponent,
    StateDisplayComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES),

    StoreModule.forFeature('upload', uploadReducers),
    EffectsModule.forFeature([UploadEffects]),

    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetsModule
  ],
  providers: [UploadFilesService]
})
export class UploadModule {}
