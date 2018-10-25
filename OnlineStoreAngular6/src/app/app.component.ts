import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menuItems: MenuItem[];

  ngOnInit(): void{
  this.menuItems=[
    // {label: "Category", icon: "fa fa-calendar", routerLink: ['/category']},
    // {label: "Customer", icon: "fa fa-user", routerLink: ['/customer']},
    // {label: "Employee", icon: "fa fa-users", routerLink: ['/employee']},
    // {label: "Shipper", icon: "fa fa-truck", routerLink: ['/shipper']},
    // {label: "Order", icon: "fa fa-user", routerLink: ['/order']},
    // {label: "Supplier", icon: "fa fa-user", routerLink: ['/supplier']},
    // {label: "Product", icon: "fa fa-user", routerLink: ['/product']},
    // {label: "Airport", icon: "fa fa-plane", routerLink: ['/airport']},
    // {label: "Doctor", icon: "fa fa-user-md", routerLink: ['/doctor']},
    // {label: "Patient", icon: "fa fa-user", routerLink: ['/patient']},
    // {label: "Person", icon: "fa fa-user", routerLink: ['/person']},
    {label: "Paper", icon: "fa fa-file", routerLink: ['/paper']},

  ] 
  }
}
