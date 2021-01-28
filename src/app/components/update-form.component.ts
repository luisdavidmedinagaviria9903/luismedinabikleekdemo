import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CustomerService} from '../service/customer.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Customer} from '../model/customer';
import * as moment from 'moment';


@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
  form = new FormGroup({});
  customer: Customer;
  updatedCustomer: Customer;
  today = moment();


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private customerService: CustomerService, private fb: FormBuilder) {
    this.customer = new  Customer();
    this.updatedCustomer = new Customer();
  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.customerService.findOne(this.data.customerId).subscribe(response => {
      console.log(response);
      this.customer = response;
    }, error => {
      console.log(error);
    });

    this.formBuilder();
  }

  // tslint:disable-next-line:typedef
  formBuilder(){
    this.form = this.fb.group({
      document: new  FormControl(''),
      email: new  FormControl(''),
      firstName: new  FormControl(''),
      lastName: new  FormControl(''),
      mobile: new  FormControl(''),
      birthDate: new  FormControl(''),
      age: new  FormControl(''),
      genderType: [''],
    });
  }

  // tslint:disable-next-line:typedef
  submit() {
    this.updatedCustomer.id = this.customer.id;
    this.updatedCustomer.document = this.form.get('document').value;
    this.updatedCustomer.email = this.form.get('email').value;
    this.updatedCustomer.firstName = this.form.get('firstName').value;
    this.updatedCustomer.secondName = this.customer.secondName;
    this.updatedCustomer.lastName = this.form.get('lastName').value;
    this.updatedCustomer.secondLastName = this.customer.secondLastName;
    this.updatedCustomer.birthDate = moment(this.form.get('birthDate').value).format('YYYY-MM-DD');
    this.updatedCustomer.genderType = this.form.get('genderType').value;
    this.updatedCustomer.creationDate = this.customer.creationDate;
    this.updatedCustomer.modifyDate = this.today.format('YYYY-MM-DD hh:mm:ss');

    this.customerService.save(this.updatedCustomer).subscribe(response => {
      if (response != null){
        window.alert('Success: ' + JSON.stringify(response));
      }
    }, error => {
      console.log(error);
    });
  }
}

