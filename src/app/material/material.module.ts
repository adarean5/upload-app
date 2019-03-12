import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatTooltipModule,
  MatTableModule,
  MatFormFieldModule,
  MatSortModule
} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';

/**
 * Used for importing the angular material components to other modules.
 *
 * @export
 * @class MaterialModule
 */
@NgModule({
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatSortModule,
    MatRippleModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatSortModule,
    MatRippleModule
  ],
  declarations: []
})
export class MaterialModule {}
