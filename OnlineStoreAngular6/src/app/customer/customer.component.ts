import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../services/customer.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  customerList: Customer[];
  selectCustomer: Customer;
  customerForm: FormGroup;
  isAddCustomer: boolean;
  indexOfCustomer: number=0;
  isDeleteCustomer: boolean;
  totalRecords: number=0;
  searchCompanyName: string = "";

  constructor(private customerService: CustomerService, private fb: FormBuilder) { }

  @ViewChild('dt') public dataTable:DataTable;
  ngOnInit() {
    this.customerForm = this.fb.group({
      'companyName': new FormControl('', Validators.required),
      'contactName': new FormControl('', Validators.required),
      'contactTitle': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'region': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'fax': new FormControl('', Validators.required),
    });
    this.loadAllCustomer();
  }
loadAllCustomer(){
  this.customerService.getCustomer().then(result=> {
    this.customerList = result;
  });
}
paginate($event){
  this.customerService.getCustomerwithPagination($event.first, $event.rows, this.searchCompanyName).then(result=>{this.totalRecords=result.totalRecords; this.customerList=result.results;})
}

searchCustomer(){
if(this.searchCompanyName.length!=1){
  this.dataTable.reset();
}
}

addCustomer(){
  this.customerForm.enable();
  this.isAddCustomer = true;
  this.isDeleteCustomer = false;
  this.selectCustomer={} as Customer;
}

editCustomer(Customer){
  this.customerForm.enable();
  this.isAddCustomer = false;
  this.isDeleteCustomer = false;
  this.indexOfCustomer=this.customerList.indexOf(Customer);
  this.selectCustomer=Customer; 
  this.selectCustomer = Object.assign({}, this.selectCustomer);
}

deleteCustomer(Customer){
  this.customerForm.disable();
  this.isDeleteCustomer=true;
  this.indexOfCustomer=this.customerList.indexOf(Customer);
  this.selectCustomer=Customer; 
  this.selectCustomer = Object.assign({}, this.selectCustomer);
}

okDelete(){
  let tempCustomerList=[...this.customerList];
  this.customerService.deleteCustomer(this.selectCustomer.customerID).then(()=>{
  tempCustomerList.splice(this.indexOfCustomer, 1);
  this.customerList = tempCustomerList;
  this.selectCustomer = null;
});
}

saveCustomer(){
  let tempCustomerList=[...this.customerList];
    if(this.isAddCustomer == true){this.customerService.addCustomer(this.selectCustomer).then(result=> {
      tempCustomerList.push(result)
      this.customerList=tempCustomerList;
      this.selectCustomer=null;
    });
    }
    else{
        this.customerService.editCustomer(this.selectCustomer.customerID, this.selectCustomer).then(result=> {
          tempCustomerList[this.indexOfCustomer] = result;
          this.customerList=tempCustomerList;
          this.selectCustomer=null;
        });
    }
    }
  
cancelCustomer(){
    this.selectCustomer=null;
    }
}
