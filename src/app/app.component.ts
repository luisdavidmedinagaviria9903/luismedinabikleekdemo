import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Customer} from './model/customer';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CustomerService} from './service/customer.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UpdateFormComponent} from './components/update-form.component';
import {CreateFormComponent} from './components/create-form.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'luismedinabikleekdemo';

  displayedColumns: string[] =  ['id', 'email', 'document', 'name', 'mobile', 'birthDate', 'age', 'genderType', 'actions'];
  dataSource: MatTableDataSource<Customer>;
  customersArray: Customer[] = [];


  constructor(private customerService: CustomerService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.startSearch();
  }


  // tslint:disable-next-line:typedef
  startSearch(){

    this.customerService.startSearch().subscribe(response => {
      console.log(response);
      this.customersArray = response.content;
      this.dataSource = new MatTableDataSource(this.customersArray);
      console.log(this.dataSource);

    }, error => {
      console.log(error);
    });
  }


  // tslint:disable-next-line:typedef
  deleteCustomer(id: number){
    this.customerService.deleteOne(id).subscribe(response => {
      window.alert(JSON.stringify(response));
      window.location.reload();
    }, error => {
      window.alert(JSON.stringify(error));
    });
  }


  // tslint:disable-next-line:typedef
  openModal(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    this.dialog.open(UpdateFormComponent, {data: {customerId: id }});

  }

  // tslint:disable-next-line:typedef
  openCreateCustomerModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    this.dialog.open(CreateFormComponent);

  }




}
