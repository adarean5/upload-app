import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-state-display',
  templateUrl: './state-display.component.html',
  styleUrls: ['./state-display.component.scss']
})
export class StateDisplayComponent implements OnInit {
  /**
   * File names to be displayed in the "Uploading" section
   *
   * @type {string[]}
   * @memberof StateDisplayComponent
   */
  @Input()
  public uploading: string[];

  /**
   * File names to be displayed in the "Uploading" section
   *
   * @type {string[]}
   * @memberof StateDisplayComponent
   */
  @Input()
  public downloading: string[];

  /**
   * File names to be displayed in the "Uploading" section
   *
   * @type {string[]}
   * @memberof StateDisplayComponent
   */
  @Input()
  public deleting: string[];

  constructor() {}

  ngOnInit() {}
}
