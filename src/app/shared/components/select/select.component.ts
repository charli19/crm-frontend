import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'crm-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  @Input() selectData: Array<any> = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'user', viewValue: 'User' },
  ];

  role: FormControl = new FormControl('', [Validators.required]);

  @Output() selectEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public changeRole(roleId: number): void {
    this.selectEmitter.emit(roleId);
  }
}
