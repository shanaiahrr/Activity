import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../../domain/patient';
import { PatientService } from '../../services/patient.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [PatientService]
})

export class PatientComponent implements OnInit {
  patientList: Patient[];
  selectPatient: Patient;
  patientForm: FormGroup;
  isAddPatient: boolean;
  indexOfPatient: number=0;
  isDeletePatient: boolean;
  totalRecords: number=0;
  searchPatientLastName: string = "";

  constructor(private patientService: PatientService, private fb: FormBuilder) { }

  @ViewChild('dt') public dataTable:DataTable;
  ngOnInit() {
    this.patientForm = this.fb.group({
        'patientFirstName': new FormControl('', Validators.required),
        'patientMiddleName': new FormControl(''),
        'patientLastName': new FormControl('', Validators.required),
        'patientAge': new FormControl('', Validators.required),
        'patientGender': new FormControl('', Validators.required),
        'maritalStatus': new FormControl('', Validators.required),
        'phone': new FormControl('', Validators.required),
        'illness': new FormControl('', Validators.required),
        'isDischarged': new FormControl('', Validators.required)
    });
    
  }
loadAllPatients(){
  this.patientService.getPatient().then(result=> {
    this.patientList = result;
  });
}
paginate($event){
  this.patientService.getPatientWithPagination($event.first, $event.rows, this.searchPatientLastName).then(result=>{this.totalRecords=result.totalRecords; this.patientList=result.results;})
}

searchPatient(){
if(this.searchPatientLastName.length!=1){
  this.dataTable.reset();
}
}

addPatient(){
  this.patientForm.enable();
  this.isAddPatient = true;
  this.isDeletePatient = false;
  this.selectPatient={} as Patient;
}

editPatient(Patient){
  this.patientForm.enable();
  this.isAddPatient = false;
  this.isDeletePatient = false;
  this.indexOfPatient=this.patientList.indexOf(Patient);
  this.selectPatient=Patient; 
  this.selectPatient = Object.assign({}, this.selectPatient);
}

deletePatient(Patient){
  this.patientForm.disable();
  this.isDeletePatient=true;
  this.indexOfPatient=this.patientList.indexOf(Patient);
  this.selectPatient=Patient; 
  this.selectPatient = Object.assign({}, this.selectPatient);
}

okDelete(){
  let tempPatientList=[...this.patientList];
  this.patientService.deletePatient(this.selectPatient.patientID).then(()=>{
  tempPatientList.splice(this.indexOfPatient, 1);
  this.patientList = tempPatientList;
  this.selectPatient = null;
});
}

savePatient(){
  let tempPatientList=[...this.patientList];
    if(this.isAddPatient == true){this.patientService.addPatient(this.selectPatient).then(result=> {
      tempPatientList.push(result)
      this.patientList=tempPatientList;
      this.selectPatient=null;
    });
    }
    else{
        this.patientService.editPatient(this.selectPatient.patientID, this.selectPatient).then(result=> {
          tempPatientList[this.indexOfPatient] = result;
          this.patientList=tempPatientList;
          this.selectPatient=null;
        });
    }
    }
  
cancelPatient(){
    this.selectPatient=null;
    }
}
