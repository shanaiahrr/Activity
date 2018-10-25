import { Component, OnInit, ViewChild } from '@angular/core';
import { Supplier } from '../../domain/supplier';
import { SupplierService } from '../../services/supplier.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers: [SupplierService]
})
export class SupplierComponent implements OnInit {
  supplierList: Supplier[];
  selectSupplier: Supplier;
  supplierForm: FormGroup;
  isAddSupplier: boolean;
  indexOfSupplier: number=0;
  isDeleteSupplier: boolean;
  totalRecords: number=0;
  searchCompanyName: string = "";

  constructor(private supplierService: SupplierService, private fb: FormBuilder) { }

  @ViewChild('dt') public dataTable:DataTable;
  ngOnInit() {
    this.supplierForm = this.fb.group({
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
      'homePage': new FormControl('', Validators.required)
    });
    this.loadAllSupplier();
  }
loadAllSupplier(){
  this.supplierService.getSupplier().then(result=> {
    this.supplierList = result;
  });
}

paginate($event){
  this.supplierService.getSupplierwithPagination($event.first, $event.rows, this.searchCompanyName).then(result=>{this.totalRecords=result.totalRecords; this.supplierList=result.results;})
}

searchSupplier(){
if(this.searchCompanyName.length!=1){
  this.dataTable.reset();
}
}

addSupplier(){
  this.supplierForm.enable();
  this.isAddSupplier = true;
  this.isDeleteSupplier = false;
  this.selectSupplier={} as Supplier;
}

editSupplier(Supplier){
  this.supplierForm.enable();
  this.isAddSupplier = false;
  this.isDeleteSupplier = false;
  this.indexOfSupplier=this.supplierList.indexOf(Supplier);
  this.selectSupplier=Supplier; 
  this.selectSupplier = Object.assign({}, this.selectSupplier);
}

deleteSupplier(Supplier){
  this.supplierForm.disable();
  this.isDeleteSupplier=true;
  this.indexOfSupplier=this.supplierList.indexOf(Supplier);
  this.selectSupplier=Supplier; 
  this.selectSupplier = Object.assign({}, this.selectSupplier);
}

okDelete(){
  let tempSupplierList=[...this.supplierList];
  this.supplierService.deleteSupplier(this.selectSupplier.supplierID).then(()=>{
  tempSupplierList.splice(this.indexOfSupplier, 1);
  this.supplierList = tempSupplierList;
  this.selectSupplier = null;
});
}

saveSupplier(){
  let tempSupplierList=[...this.supplierList];
    if(this.isAddSupplier == true){this.supplierService.addSupplier(this.selectSupplier).then(result=> {
      tempSupplierList.push(result)
      this.supplierList=tempSupplierList;
      this.selectSupplier=null;
    });
    }
    else{
        this.supplierService.editSupplier(this.selectSupplier.supplierID, this.selectSupplier).then(result=> {
          tempSupplierList[this.indexOfSupplier] = result;
          this.supplierList=tempSupplierList;
          this.selectSupplier=null;
        });
    }
    }
  
cancelSupplier(){
    this.selectSupplier=null;
    }
}
