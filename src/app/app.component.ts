import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Customer} from './model/customer';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CustomerService} from './service/customer.service';
import { MatTableModule } from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UpdateFormComponent} from './components/update-form.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private customerService: CustomerService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.startSearch();
  }


  // tslint:disable-next-line:typedef
  startSearch(){

    this.customerService.startSearch(this.paginator).subscribe(response => {
      console.log(response);
      this.customersArray = response.content;
      this.dataSource = new MatTableDataSource(this.customersArray);
      console.log(this.dataSource);
      this.paginator.length = response.totalElements;



    }, error => {
      console.log(error);
    });
  }




  // tslint:disable-next-line:typedef
  getPageEvent(pageEvent: PageEvent){

    console.log(pageEvent);
    this.paginator.length = pageEvent.length;
    this.paginator.pageSize = pageEvent.pageSize;
    this.paginator.pageIndex = pageEvent.pageIndex;


    this.customerService.startSearch(this.paginator).subscribe(response => {
      console.log(response);
      this.customersArray = response.response.content;
      this.dataSource = new MatTableDataSource(this.customersArray);
      console.log(this.dataSource);
      this.paginator.length = response.response.totalElements;

    }, error => {

      console.log(error);

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




}
