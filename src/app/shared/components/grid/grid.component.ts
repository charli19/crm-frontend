import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'crm-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnChanges {
  @Input() public columns = Array<string>();
  @Input() public displayedColumns = Array<string>();
  @Input() public dataSource = Array<Contact>();

  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnChanges() {}

  public delete(id: number): void {
    this.deleteEmitter.emit(id);
  }
}
