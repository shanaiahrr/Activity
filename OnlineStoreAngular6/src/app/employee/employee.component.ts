import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../domain/employee';
import { EmployeeService } from '../../services/employee.service';
import { DatePipe } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService, DatePipe]
})

export class EmployeeComponent implements OnInit {
  employeeList: Employee[];
  selectEmployee: Employee;
  isAddEmployee: boolean;
  indexOfEmployee: number = 0;
  isDeleteEmployee: boolean;
  employeeForm: FormGroup;
  birthDate: Date;
  hireDate: Date;
  totalRecords: number = 0;
  searchEmpLastName: string = "";

  constructor(private employeeService: EmployeeService,
    private fb: FormBuilder, private datePipe: DatePipe) { }

  @ViewChild('dt') public dataTable: DataTable;
  ngOnInit() {
    this.employeeForm = this.fb.group({
      'empFirstName': new FormControl('', Validators.required),
      'empLastName': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'titleOfCourtesy': new FormControl('', Validators.required),
      'birthDate': new FormControl('', Validators.required),
      'hireDate': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'region': new FormControl('', Validators.required),
      'homePhone': new FormControl('', Validators.required),
      'extension': new FormControl('', Validators.required),
      'photo': new FormControl(''),
      'notes': new FormControl('', Validators.required),
      'reportsTo': new FormControl('', Validators.required)
    });

    //this.loadAllEmployees();
  }

  // loadAllEmployees() {
  //   this.employeeService.getEmployee().then(result => {
  //     this.employeeList = result;

  //     for (let i = 0; i < this.employeeList.length; i++) {
  //       this.employeeList[i].birthDate =
  //         this.datePipe.transform(this.employeeList[i].birthDate, 'yyyy-MM-dd');

  //       this.employeeList[i].hireDate =
  //         this.datePipe.transform(this.employeeList[i].hireDate, 'yyyy-MM-dd');
  //     }
  //   })
  // }


  paginate($event) {
    this.employeeService.getEmployeewithPagination($event.first, $event.rows, this.searchEmpLastName).then(result => { 
      this.totalRecords = result.totalRecords; 
      this.employeeList = result.results; 

      

      for (let i = 0; i < this.employeeList.length; i++) {
        this.employeeList[i].birthDate =
          this.datePipe.transform(this.employeeList[i].birthDate, 'yyyy-MM-dd');

        this.employeeList[i].hireDate =
          this.datePipe.transform(this.employeeList[i].hireDate, 'yyyy-MM-dd');
      }
    })
  }

  searchEmployee() {
    if (this.searchEmpLastName.length != 1) {
      this.dataTable.reset();
    }
  }

  addEmployee() {
    this.employeeForm.enable();
    this.isAddEmployee = true;
    this.isDeleteEmployee = false;
    this.birthDate = null;
    this.hireDate = null;
    this.selectEmployee = {} as Employee;

  }

  editEmployee(Employee) {
    this.employeeForm.enable();
    this.isAddEmployee = false;
    this.isDeleteEmployee = false;
    this.indexOfEmployee = this.employeeList.indexOf(Employee);
    this.selectEmployee = Employee;
    this.selectEmployee = Object.assign({}, this.selectEmployee);
    this.birthDate = new Date(this.selectEmployee.birthDate);
    this.hireDate = new Date(this.selectEmployee.hireDate);
  }

  deleteEmployee(Employee) {
    this.employeeForm.disable();
    this.isDeleteEmployee = true;
    this.indexOfEmployee = this.employeeList.indexOf(Employee);
    this.selectEmployee = Employee;
    this.selectEmployee = Object.assign({}, this.selectEmployee);
  }

  okDelete() {
    let tmpEmployeeList = [...this.employeeList];
    this.employeeService.deleteEmployee(this.selectEmployee.employeeID)
      .then(() => {
        tmpEmployeeList.splice(this.indexOfEmployee, 1);
        this.employeeList = tmpEmployeeList;
        this.selectEmployee = null;
      });
  }

  saveEmployee() {
    let tmpEmployeeList = [...this.employeeList];

    this.selectEmployee.birthDate =
      this.datePipe.transform(this.birthDate, 'yyyy-MM-dd');

    this.selectEmployee.hireDate =
      this.datePipe.transform(this.hireDate, 'yyyy-MM-dd');

    if (this.isAddEmployee == true) {
      this.employeeService.addEmployee(this.selectEmployee).then(result => {
        result.birthDate =
          this.datePipe.transform(this.birthDate, 'yyyy-MM-dd');
        result.hireDate =
          this.datePipe.transform(this.hireDate, 'yyyy-MM-dd');

        tmpEmployeeList.push(result);
        this.employeeList = tmpEmployeeList;
        this.selectEmployee = null;
      });
    }
    else {
      this.employeeService.editEmployee(this.selectEmployee.employeeID,
        this.selectEmployee).then(result => {
          result.birthDate =
            this.datePipe.transform(this.birthDate, 'yyyy-MM-dd');
          result.hireDate =
            this.datePipe.transform(this.hireDate, 'yyyy-MM-dd');
          tmpEmployeeList[this.indexOfEmployee] = result;
          this.employeeList = tmpEmployeeList;
          this.selectEmployee = null;
        });
    }
  }

  cancelEmployee() {
    this.selectEmployee = null;
  }
}
