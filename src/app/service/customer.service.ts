import { Injectable } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SearchParameters} from '../model/search-parameters';
import {Customer} from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private urlEndPoint = environment.apiUrl;
  searchParameters: SearchParameters;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  constructor(private http: HttpClient) {
    this.searchParameters = new SearchParameters();
  }



  startSearch(matPaginator: MatPaginator): any {

    console.log(matPaginator);
    this.searchParameters.pageSize = matPaginator.pageSize;
    this.searchParameters.pageNo = matPaginator.pageIndex;

    return this.http.post(this.urlEndPoint + 'customer/findAll', this.searchParameters, {headers: this.headers});
  }


  findOne(document: string): any{
    return this.http.get(this.urlEndPoint + 'customer/' + document);
  }

  save(customer: Customer): any {
    return this.http.post(this.urlEndPoint + 'customer/save', customer, {headers: this.headers});
  }

}
