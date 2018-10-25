import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileSelectDirective } from 'ng2-file-upload';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';

import {ButtonModule} from 'primeng/button';
import { CategoryComponent } from './category/category.component';
import {TableModule} from 'primeng/table';
import {DataTableModule} from 'primeng/primeng';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {MenuModule} from 'primeng/menu';
import {CommonModule} from '@angular/common';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';


import { CustomerComponent } from './customer/customer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ShipperComponent } from './shipper/shipper.component';
import { EmployeeComponent } from './employee/employee.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import { AirportComponent } from './airport/airport.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { PersonComponent } from './person/person.component';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatNativeDateModule
} from '@angular/material';
import { CitizenComponent } from './citizen/citizen.component';
import { PaperComponent } from './paper/paper.component';


@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    SampleComponent,
    CategoryComponent,
    CustomerComponent,
    SupplierComponent,
    ShipperComponent,
    EmployeeComponent,
    DoctorComponent,
    PatientComponent,
    AirportComponent,
    ProductComponent,
    OrderComponent,
    OrderDetailComponent,
    PersonComponent,
    CitizenComponent,
    PaperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    DataTableModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DialogModule,
    BrowserAnimationsModule,
    CalendarModule,
    MenuModule,
    CommonModule,
    RadioButtonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatNativeDateModule,
    DropdownModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
