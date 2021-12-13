import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'crm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() length: any = 0;
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 5;

  @Output() getDataEmitter: EventEmitter<any> = new EventEmitter();

  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent | undefined;

  constructor() { }

  ngOnInit() {
  }

  public getData(data: PageEvent): any {
    this.pageIndex = data.pageIndex;
    this.pageSize = data.pageSize;
    let page = {
      pageIndex: this.pageIndex, pageSize: this.pageSize
    }

    this.getDataEmitter.emit(page);
  }

}
