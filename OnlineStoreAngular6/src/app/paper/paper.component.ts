import { Component, OnInit, ViewChild } from '@angular/core';
import { Paper } from '../../domain/paper';
import { PaperService } from '../../services/paper.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css'],
  providers: [PaperService, DatePipe]
})
export class PaperComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['button', 'paperID', 'typeOfPaper', 'price', 'isActive', 'dateCreated'];
  paperList: Paper[];
  selectPaper: Paper;
  paperFormGroup: FormGroup;
  isAddPaper: boolean;
  indexOfPaper: number = 0;
  isDeletePaper: boolean;
  totalRecords: number = 0;
  searchTypeOfPaper: string = "";
  // isActive: string[] = ['true', 'false'];
  dateCreated: Date;
  minDate = new Date(Date.now());
  getToday: string;
  rows:number = 5;
  isActive: boolean;
  

  constructor(private paperService: PaperService, private fb: FormBuilder, private datePipe: DatePipe) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.paperFormGroup = this.fb.group({
      typeOfPaper: ['', Validators.required],
      price: ['', Validators.required],
      isActive: ['', Validators.required],
      dateCreated: ['', Validators.required],
     
    });

this.loadAllPapers();

 }

 applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  loadAllPapers() {
    this.paperService.getPaper().then(papers => {
      this.paperList = papers;
 
  
      for (let i = 0; i < this.paperList.length; i++) {
        this.paperList[i].dateCreated =
          this.datePipe.transform(this.paperList[i].dateCreated, 'yyyy-MM-dd');  
      }
      this.dataSource = new MatTableDataSource<Paper>(this.paperList);
      this.dataSource.paginator = this.paginator;
    });
    
  }

  paginate($event) {
    this.paperService.getPaperWithPagination($event.first, $event.rows, this.searchTypeOfPaper).then(result => {
      this.totalRecords = result.totalRecords;
      this.paperList = result.results;

      for (let i = 0; i < this.paperList.length; i++) {
        this.paperList[i].dateCreated=
          this.datePipe.transform(this.paperList[i].dateCreated, 'yyyy-MM-dd');
      }
    })
  }

  searchPaper() {
    if (this.searchTypeOfPaper.length != 1) {
      this.loadAllPapers();
    }
  }

  addPaper() {
    this.paperFormGroup.enable();
    this.isDeletePaper = false;
    this.isAddPaper = true;
    this.selectPaper = {} as Paper;
    // this.isActive=null;
    this.loadAllPapers();

  }
 
  editPaper(Paper) {
    this.paperFormGroup.enable();
    this.isAddPaper = false;
    this.isDeletePaper = false;
    this.indexOfPaper = this.paperList.indexOf(Paper);
    this.selectPaper = Paper;
    this.selectPaper = Object.assign({}, this.selectPaper);
    this.isActive = this.selectPaper.isActive;
    this.dateCreated = new Date(this.selectPaper.dateCreated);
    this.loadAllPapers();
  }

  deletePaper(Paper) {
    
    this.paperFormGroup.disable();
    this.isDeletePaper = true;
    this.indexOfPaper = this.paperList.indexOf(Paper);
    this.selectPaper = Paper;
    this.selectPaper = Object.assign({}, this.selectPaper);  
  }

  okDelete() {
    let tmpPaperList = [...this.paperList];
    this.paperService.deletePaper(this.selectPaper.paperID)
        .then(() => {
          tmpPaperList.splice(this.indexOfPaper, 1);
          this.paperList = tmpPaperList;
          this.selectPaper = null;
          this.loadAllPapers();
        
        });
        
  }

  savePaper() {
    let tmpPaperList = [...this.paperList];
    
    this.selectPaper.dateCreated =
    this.datePipe.transform(this.selectPaper.dateCreated, 'yyyy-MM-dd');
    // this.selectPaper.isActive=this.isActive;

    if (this.isAddPaper == true) {
    this.paperService.addPaper(this.selectPaper).then(result => {
    
    result.dateCreated =
    this.datePipe.transform(this.selectPaper.dateCreated, 'yyyy-MM-dd');
    
    tmpPaperList.push(result);
    this.paperList = tmpPaperList;
    this.selectPaper = null;
    this.loadAllPapers();
    });
    }
    else {
    this.paperService.editPaper(this.selectPaper.paperID,
    this.selectPaper).then(result => {
    
    result.dateCreated =
    this.datePipe.transform(this.selectPaper.dateCreated, 'yyyy-MM-dd');
    
    tmpPaperList[this.indexOfPaper] = result;
    this.paperList = tmpPaperList;
    this.selectPaper = null;
    this.loadAllPapers();
    });
    }
    
    }

  cancelPaper() {
    this.selectPaper = null;
  }
}