import { FileInfo } from '../../../models/file-info.model';
import {
  Component,
  Input,
  Output,
  ViewChild,
  OnChanges,
  EventEmitter
} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

/**
 * Table for displaying the files currently located on the server.
 * Uses mat-table for appearance
 *
 * @export
 * @class FileTableComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 */
@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class FileTableComponent implements OnChanges {
  protected displayedColumns = ['name', 'size', 'creationDate'];
  public dataSource: MatTableDataSource<FileInfo>;
  /**
   * The currently expanded row in the table.
   * The in the table which matches this variable, gets expanded.
   * If the value is set to null, no row is expanded.
   *
   * @memberof FileTableComponent
   */
  public expandedElement;

  /**
   * Configures the matSort element in the file-table.component.html
   *
   * @type {MatSort}
   * @memberof FileTableComponent
   */
  @ViewChild(MatSort)
  sort: MatSort;

  /**
   * Array of information about files to be displayed in the table.
   *
   * @type {FileInfo[]}
   * @memberof FileTableComponent
   */
  @Input()
  fileInfo: FileInfo[];

  /**
   * @type {EventEmitter<string>}
   * @memberof FileTableComponent
   */
  @Output()
  downloadEmitter: EventEmitter<string> = new EventEmitter();

  /**
   * @type {EventEmitter<string>}
   * @memberof FileTableComponent
   */
  @Output()
  deleteEmitter: EventEmitter<string> = new EventEmitter();

  /**
   * Creates an instance of FileTableComponent.
   * @memberof FileTableComponent
   */
  constructor() {}

  /**
   * Creates a new MatTableDataSource from the fileInfo array
   * which is then used to display the file info in the table.
   *
   * Binds MatSort to the dataSource, which allows us to sort by columns.
   *
   * @memberof FileTableComponent
   */
  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.fileInfo);
    this.dataSource.sort = this.sort;
  }

  /**
   * Emits a new file download event to the parent component
   *
   * @param {*} row - Object that contains the information of expanded table row.
   * @memberof FileTableComponent
   */
  downloadFile(row) {
    this.downloadEmitter.emit(row.name);
  }

  /**
   * Emits a new file delete event to the parent component
   *
   * @param {*} row - Object that contains the information of expanded table row.
   * @memberof FileTableComponent
   */
  deleteFile(row) {
    this.deleteEmitter.emit(row.name);
  }

  /**
   * Sets the value of expandedElement to the clicked row, or to null
   * if the clicked row is alreadyExpanded.
   *
   * @param {*} row - Clicked row
   * @memberof FileTableComponent
   */
  expandElement(row) {
    this.expandedElement = this.expandedElement === row ? null : row;
  }
}
