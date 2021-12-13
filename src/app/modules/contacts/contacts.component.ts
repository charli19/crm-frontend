import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Contact } from 'src/app/shared/models/contact.model';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'crm-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  public contacts = Array<Contact>();

  public columns = Array<string>();
  public displayedColumns = Array<string>();
  public length = 0;
  public pageIndex = 0;
  public pageSize = 5;
  public isLoading = true;

  constructor(
    public contactService: ContactService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getContacts();
  }

  private getContacts(): void {
    this.contactService
      .getContacts(this.pageIndex, this.pageSize)
      .subscribe((x) => {
        this.contacts = x.content;
        this.length = x.totalElements;
        this.pageSize = x.size;
        this.contacts.filter((x) => {
          this.columns = Object.keys(x);
          this.columns.push('actions');
          this.displayedColumns = Object.keys(x);
          this.displayedColumns.push('actions');
        });
      });
    this.isLoading = false;
  }

  public deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe((res) => {
      if (res.status === 200) {
        this._snackBar.open('Contact deleted', 'Close', {
          duration: 2000,
        });
        this.getContacts();
      }
    });
    this._snackBar.dismiss();
  }

  public openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        name: 'contact',
      },
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.contactService.createContact(data.data).subscribe((res) => {
          if (res.status === 201) {
            this._snackBar.open('Contact created', 'Close', {
              duration: 2000,
            });
            this.getContacts();
          }
        });
      }
    });
  }

  public pageEvent(data: any) {
    this.pageIndex = data.pageIndex;
    this.pageSize = data.pageSize;
    this.getContacts();
  }
}
