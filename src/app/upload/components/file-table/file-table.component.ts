import { FileInfo } from '../../../models/file-info.model';
import {
  Component,
  OnInit,
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
export class FileTableComponent implements OnInit, OnChanges {
  protected displayedColumns = ['name', 'size', 'creationDate'];
  public dataSource: MatTableDataSource<FileInfo>;
  public expandedElement;

  @ViewChild(MatSort)
  sort: MatSort;

  @Input()
  fileInfo: FileInfo[];

  @Output()
  downloadEmitter: EventEmitter<string> = new EventEmitter();

  @Output()
  deleteEmitter: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.fileInfo);
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.fileInfo);
    this.dataSource.sort = this.sort;
  }

  downloadFile(row) {
    this.downloadEmitter.emit(row.name);
  }

  deleteFile(row) {
    this.deleteEmitter.emit(row.name);
  }

  expandElement(row) {
    this.expandedElement = this.expandedElement === row ? null : row;
  }
}
