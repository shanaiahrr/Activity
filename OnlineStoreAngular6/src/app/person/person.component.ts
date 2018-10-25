import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../../domain/person';
import { PersonService } from '../../services/person.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
// import { DataTable } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
// import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import {MatPaginator, MatTableDataSource} from '@angular/material';


// const URL = 'http://localhost:44381/api/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [PersonService, DatePipe]
})
export class PersonComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['button', 'personID', 'personName', 'age', 'birthday', 'photo', 'gender', 'relationshipStatus', 'nationality', 'phoneNumber', 'religion','personAddress', 'coordinates'];
  personList: Person[];
  selectPerson: Person;
  personFormGroup: FormGroup;
  isAddPerson: boolean;
  indexOfPerson: number = 0;
  isDeletePerson: boolean;
  totalRecords: number = 0;
  searchPersonName: string = "";
  genders: string[] = ['Male', 'Female'];
  birthday: Date;
  maxDate = new Date(Date.now());
  getToday: string;
  rows:number = 5;
  

  constructor(private personService: PersonService, private fb: FormBuilder, private datePipe: DatePipe) { }
  // public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild('dt') public dataTable: DataTable;
  ngOnInit() {
    this.personFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      birthday: ['', Validators.required],
      photo: [''],
      gender: ['', Validators.required],
      relationshipStatus: ['', Validators.required],
      nationality: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      religion: [''],
      street: ['', Validators.required],
      barangay: [''],
      city: ['', Validators.required],
      region: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });

this.loadAllPersons();

 }

 applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  loadAllPersons() {
    this.personService.getPerson().then(persons => {
      this.personList = persons;
 
  
      for (let i = 0; i < this.personList.length; i++) {
        this.personList[i].birthday =
          this.datePipe.transform(this.personList[i].birthday, 'yyyy-MM-dd');  
      }
      this.dataSource = new MatTableDataSource<Person>(this.personList);
      this.dataSource.paginator = this.paginator;
    });
    
  }


  paginate($event) {
    this.personService.getPersonWithPagination($event.first, $event.rows, this.searchPersonName).then(result => {
      this.totalRecords = result.totalRecords;
      this.personList = result.results;

      for (let i = 0; i < this.personList.length; i++) {
        this.personList[i].birthday=
          this.datePipe.transform(this.personList[i].birthday, 'yyyy-MM-dd');
      }
    })
  }

  searchPerson() {
    if (this.searchPersonName.length != 1) {
      this.loadAllPersons();
    }
  }


  // resetTable() {
  //   this.dataTable.reset();
  // }

  computeAge() {
    var dateold = new Date(this.personFormGroup.value.birthday);
    var datenew = new Date();
    var ynew = datenew.getFullYear();
    var mnew = datenew.getMonth();
    var dnew = datenew.getDate();
    var yold = dateold.getFullYear();
    var mold = dateold.getMonth();
    var dold = dateold.getDate();
    var diff = ynew - yold;
    if (mold > mnew) diff--;
      else {
        if (mold == mnew) {
            if (dold > dnew) diff--;
        }
    }
    this.selectPerson.age = diff;  
  }

  addPerson() {
    this.personFormGroup.enable();
    this.isDeletePerson = false;
    this.isAddPerson = true;
    this.selectPerson = {} as Person;
    this.loadAllPersons();
  }

 
  editPerson(Person) {
    this.personFormGroup.enable();
    this.isAddPerson = false;
    this.isDeletePerson = false;
    this.indexOfPerson = this.personList.indexOf(Person);
    this.selectPerson = Person;
    this.selectPerson = Object.assign({}, this.selectPerson);

    this.birthday = new Date(this.selectPerson.birthday);
    this.loadAllPersons();
  }

  deletePerson(Person) {
    
    this.personFormGroup.disable();
    this.isDeletePerson = true;
    this.indexOfPerson = this.personList.indexOf(Person);
    this.selectPerson = Person;
    this.selectPerson = Object.assign({}, this.selectPerson);  
  }

  okDelete() {
    let tmpPersonList = [...this.personList];
    this.personService.deletePerson(this.selectPerson.personID)
        .then(() => {
          tmpPersonList.splice(this.indexOfPerson, 1);
          this.personList = tmpPersonList;
          this.selectPerson = null;
          this.loadAllPersons();
        
        });
        
  }


  savePerson() {
    let tmpPersonList = [...this.personList];
    
    this.selectPerson.birthday =
    this.datePipe.transform(this.selectPerson.birthday, 'yyyy-MM-dd');
    
    if (this.isAddPerson == true) {
    this.personService.addPerson(this.selectPerson).then(result => {
    
    result.birthday =
    this.datePipe.transform(this.selectPerson.birthday, 'yyyy-MM-dd');
    
    tmpPersonList.push(result);
    this.personList = tmpPersonList;
    this.selectPerson = null;
    this.loadAllPersons();
    });
    }
    else {
    this.personService.editPerson(this.selectPerson.personID,
    this.selectPerson).then(result => {
    
    result.birthday =
    this.datePipe.transform(this.selectPerson.birthday, 'yyyy-MM-dd');
    
    tmpPersonList[this.indexOfPerson] = result;
    this.personList = tmpPersonList;
    this.selectPerson = null;
    this.loadAllPersons();
    });
    }
    
    }

  cancelPerson() {
    this.selectPerson = null;
  }
}