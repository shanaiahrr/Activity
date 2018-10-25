import { Component, OnInit, ViewChild } from '@angular/core';
import { Shipper } from '../../domain/shipper';
import { ShipperService } from '../../services/shipper.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css'],
  providers: [ShipperService]
})
export class ShipperComponent implements OnInit {
  shipperList: Shipper[];
  selectShipper: Shipper;
  shipperForm: FormGroup;
  isAddShipper: boolean;
  indexOfShipper: number=0;
  isDeleteShipper: boolean;
  totalRecords: number=0;
  searchCompanyName: string = "";

  constructor(private shipperService: ShipperService, private fb: FormBuilder) { }
 
  @ViewChild('dt') public dataTable:DataTable;
  ngOnInit() {
    this.shipperForm = this.fb.group({
      'companyName': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required)
    });
    this.loadAllShipper();
  }
  loadAllShipper(){
    this.shipperService.getShipper().then(result=> {
      this.shipperList = result;
    });
  }
  paginate($event){
    this.shipperService.getShipperwithPagination($event.first, $event.rows, this.searchCompanyName).then(result=>{this.totalRecords=result.totalRecords; this.shipperList=result.results;})
  }
  
  searchShipper(){
  if(this.searchCompanyName.length!=1){
    this.dataTable.reset();
  }
  }
addShipper(){
  this.shipperForm.enable();
  this.isAddShipper = true;
  this.isDeleteShipper = false;
  this.selectShipper={} as Shipper;
}

editShipper(Shipper){
  this.shipperForm.enable();
  this.isAddShipper = false;
  this.isDeleteShipper = false;
  this.indexOfShipper=this.shipperList.indexOf(Shipper);
  this.selectShipper=Shipper; 
  this.selectShipper = Object.assign({}, this.selectShipper);
}

deleteShipper(Shipper){
  this.shipperForm.disable();
  this.isDeleteShipper=true;
  this.indexOfShipper=this.shipperList.indexOf(Shipper);
  this.selectShipper=Shipper; 
  this.selectShipper = Object.assign({}, this.selectShipper);
}

okDelete(){
  let tempShipperList=[...this.shipperList];
  this.shipperService.deleteShipper(this.selectShipper.shipperID).then(()=>{
  tempShipperList.splice(this.indexOfShipper, 1);
  this.shipperList = tempShipperList;
  this.selectShipper = null;
});
}

saveShipper(){
  let tempShipperList=[...this.shipperList];
    if(this.isAddShipper == true){this.shipperService.addShipper(this.selectShipper).then(result=> {
      tempShipperList.push(result)
      this.shipperList=tempShipperList;
      this.selectShipper=null;
    });
    }
    else{
        this.shipperService.editShipper(this.selectShipper.shipperID, this.selectShipper).then(result=> {
          tempShipperList[this.indexOfShipper] = result;
          this.shipperList=tempShipperList;
          this.selectShipper=null;
        });
    }
    }
  
cancelShipper(){
    this.selectShipper=null;
    }
}
