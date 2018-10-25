import { Component, OnInit, ViewChild } from '@angular/core';
import { Doctor } from '../../domain/doctor';
import { DoctorService } from '../../services/doctor.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
  providers: [DoctorService]
})

export class DoctorComponent implements OnInit {
  doctorList: Doctor[];
  selectDoctor: Doctor;
  doctorForm: FormGroup;
  isAddDoctor: boolean;
  indexOfDoctor: number=0;
  isDeleteDoctor: boolean;
  totalRecords: number=0;
  searchDrLastName: string = "";

  constructor(private doctorService: DoctorService, private fb: FormBuilder) { }

  @ViewChild('dt') public dataTable:DataTable;
  ngOnInit() {
    this.doctorForm = this.fb.group({
      'drFirstName': new FormControl('', Validators.required),
      'drMiddleName': new FormControl(''),
      'drLastName': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'specialization': new FormControl('', Validators.required),
      'licenseNo': new FormControl('', Validators.required),
      'worksAt': new FormControl('', Validators.required),
      'physicianType': new FormControl('', Validators.required),
      'isAvailable': new FormControl('', Validators.required),
    });
    
  }
loadAllDoctors(){
  this.doctorService.getDoctor().then(result=> {
    this.doctorList = result;
  });
}
paginate($event){
  this.doctorService.getDoctorWithPagination($event.first, $event.rows, this.searchDrLastName).then(result=>{this.totalRecords=result.totalRecords; this.doctorList=result.results;})
}

searchDoctor(){
if(this.searchDrLastName.length!=1){
  this.dataTable.reset();
}
}

addDoctor(){
  this.doctorForm.enable();
  this.isAddDoctor = true;
  this.isDeleteDoctor = false;
  this.selectDoctor={} as Doctor;
}

editDoctor(Doctor){
  this.doctorForm.enable();
  this.isAddDoctor = false;
  this.isDeleteDoctor = false;
  this.indexOfDoctor=this.doctorList.indexOf(Doctor);
  this.selectDoctor=Doctor; 
  this.selectDoctor = Object.assign({}, this.selectDoctor);
}

deleteDoctor(Doctor){
  this.doctorForm.disable();
  this.isDeleteDoctor=true;
  this.indexOfDoctor=this.doctorList.indexOf(Doctor);
  this.selectDoctor=Doctor; 
  this.selectDoctor = Object.assign({}, this.selectDoctor);
}

okDelete(){
  let tempDoctorList=[...this.doctorList];
this.doctorService.deleteDoctor(this.selectDoctor.doctorID).then(()=>{
  tempDoctorList.splice(this.indexOfDoctor, 1);
  this.doctorList = tempDoctorList;
  this.selectDoctor = null;
});
}

saveDoctor(){
  let tempDoctorList=[...this.doctorList];
    if(this.isAddDoctor == true){this.doctorService.addDoctor(this.selectDoctor).then(result=> {
      tempDoctorList.push(result)
      this.doctorList=tempDoctorList;
      this.selectDoctor=null;
    });
    }
    else{
        this.doctorService.editDoctor(this.selectDoctor.doctorID, this.selectDoctor).then(result=> {
          tempDoctorList[this.indexOfDoctor] = result;
          this.doctorList=tempDoctorList;
          this.selectDoctor=null;
        });
    }
    }
  
cancelDoctor(){
    this.selectDoctor=null;
    }
}
