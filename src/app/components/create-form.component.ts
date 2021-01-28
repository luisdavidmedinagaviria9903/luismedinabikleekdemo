import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Customer} from '../model/customer';
import * as moment from 'moment';
import {CustomerService} from '../service/customer.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  form = new FormGroup({});
  customer: Customer;
  today = moment();


  constructor( private fb: FormBuilder,  private customerService: CustomerService) {
    this.customer = new Customer();
  }

  ngOnInit(): void {
    this.formBuilder();
  }

  // tslint:disable-next-line:typedef
  formBuilder(){
    this.form = this.fb.group({
      document: new  FormControl(''),
      email: new  FormControl(''),
      firstName: new  FormControl(''),
      secondName: new  FormControl(''),
      lastName: new  FormControl(''),
      secondLastName: new  FormControl(''),
      mobile: new  FormControl(''),
      birthDate: new  FormControl(''),
      genderType: [''],
    });
  }

  // tslint:disable-next-line:typedef
  submit() {
    this.customer.document = this.form.get('document').value;
    this.customer.email = this.form.get('email').value;
    this.customer.firstName = this.form.get('firstName').value;
    this.customer.secondName = this.form.get('secondName').value;
    this.customer.lastName = this.form.get('lastName').value;
    this.customer.secondLastName = this.form.get('secondLastName').value;
    this.customer.mobile = this.form.get('mobile').value;
    this.customer.birthDate = moment(this.form.get('birthDate').value).format('YYYY-MM-DD');
    this.customer.genderType = this.form.get('genderType').value;
    this.customer.creationDate = this.today.format('YYYY-MM-DD hh:mm:ss');
    this.customer.modifyDate = this.today.format('YYYY-MM-DD hh:mm:ss');

    this.customerService.save(this.customer).subscribe(response => {
      if (response != null){
        window.alert('Success: ' + JSON.stringify(response));
        window.location.reload();
      }
    }, error => {
      console.log(error);
    });
  }
}
