import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShipperComponent } from './shipper/shipper.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import { AirportComponent } from './airport/airport.component';
import { OrderComponent } from './order/order.component';
import { PersonComponent } from './person/person.component';
import { PaperComponent } from './paper/paper.component';

const routes: Routes = [
  { path: '', redirectTo: '/paper', pathMatch: 'full' },
  // { path: 'category', component: CategoryComponent },
  // { path: 'customer', component: CustomerComponent },
  // { path: 'employee', component: EmployeeComponent },
  // { path: 'shipper', component: ShipperComponent },
  // { path: 'supplier', component: SupplierComponent },
  // { path: 'product', component: ProductComponent },
  // { path: 'doctor', component: DoctorComponent },
  // { path: 'patient', component: PatientComponent },
  // { path: 'airport', component: AirportComponent },
  // { path: 'order', component: OrderComponent },
  // { path: 'person', component: PersonComponent },
  { path: 'paper', component: PaperComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
