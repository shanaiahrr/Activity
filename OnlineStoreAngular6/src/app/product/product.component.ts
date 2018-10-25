import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../services/product.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';
import { SupplierService } from '../../services/supplier.service';
import { CategoryService } from '../../services/category.service';
import { Supplier } from '../../domain/supplier';
import { Category } from '../../domain/category';




@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService, SupplierService, CategoryService]
})

export class ProductComponent implements OnInit {
  productList: Product[];
  selectProduct: Product;
  productForm: FormGroup;
  isAddProduct: boolean;
  indexOfProduct: number = 0;
  isDeleteProduct: boolean;
  totalRecords: number = 0;
  searchProductName: string = "";
  supplierList: Supplier[];
  selectSupplier: Supplier;
  categoryList: Category[];
  selectCategory: Category;
  

  constructor(private productService: ProductService, private fb: FormBuilder,
    private supplierService: SupplierService, private categoryService: CategoryService) { }

  @ViewChild('dt') public dataTable: DataTable;
  ngOnInit() {
    this.productForm = this.fb.group({
      'productName': new FormControl('', Validators.required),
      'supplier': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required),
      'quantityPerUnit': new FormControl('', Validators.required),
      'unitPrice': new FormControl('', Validators.required),
      'unitsInStock': new FormControl('', Validators.required),
      'unitsOnOrder': new FormControl('', Validators.required),
      'reOrderLevel': new FormControl('', Validators.required),
      'discontinued': new FormControl('', Validators.required),

    });

  }
  loadAllProducts() {
    this.productService.getProduct().then(result => {
      this.productList = result;
    });
  }
  paginate($event) {
    this.categoryService.getCategory().then(categories => {
      this.categoryList=categories;
      this.supplierService.getSupplier().then(suppliers => {
        this.supplierList=suppliers;
        
        this.productService.getProductWithPagination($event.first, $event.rows, this.searchProductName).then(result => 
          { this.totalRecords = result.totalRecords; 
            this.productList = result.results; 
          


        for (var i = 0; i < this.productList.length; i++) {
          this.productList[i].supplierName = this.supplierList.find(x => x.supplierID == this.productList[i].supplierID).companyName;
          this.productList[i].categoryName = this.categoryList.find(x => x.categoryID == this.productList[i].categoryID).categoryName;

        }})

      });
    });

  }

  searchProduct() {
    if (this.searchProductName.length != 1) {
      this.dataTable.reset();
    }
  }

  addProduct() {
    this.productForm.enable();
    this.isAddProduct = true;
    this.isDeleteProduct = false;
    this.selectProduct = {} as Product;
    this.selectCategory = {} as Category;
    this.selectSupplier = {} as Supplier;
  }

  editProduct(Product) {
    this.productForm.enable();
    this.isAddProduct = false;
    this.isDeleteProduct = false;
    this.indexOfProduct = this.productList.indexOf(Product);
    this.selectProduct = Product;
    this.selectCategory=this.categoryList.find(x=>x.categoryID==this.selectProduct.categoryID);
    this.selectSupplier=this.supplierList.find(x=>x.supplierID==this.selectProduct.supplierID);    
    this.selectProduct = Object.assign({}, this.selectProduct);
  }

  deleteProduct(Product) {
    this.productForm.disable();
    this.isDeleteProduct = true;
    this.indexOfProduct = this.productList.indexOf(Product);
    this.selectProduct = Product;
    this.selectCategory=this.categoryList.find(x=>x.categoryID==this.selectProduct.categoryID);
    this.selectSupplier=this.supplierList.find(x=>x.supplierID==this.selectProduct.supplierID); 
    this.selectProduct = Object.assign({}, this.selectProduct);
  }

  okDelete() {
    let tempProductList = [...this.productList];
    this.productService.deleteProduct(this.selectProduct.productID).then(() => {
      tempProductList.splice(this.indexOfProduct, 1);
      this.productList = tempProductList;
      this.selectProduct = null;
    });
  }

  saveProduct() {
    let tempProductList = [...this.productList];
    this.selectProduct.supplierID=this.selectSupplier.supplierID;
    this.selectProduct.categoryID=this.selectCategory.categoryID;
    if (this.isAddProduct == true) {
      this.productService.addProduct(this.selectProduct).then(result => {
        tempProductList.push(result)
        this.productList = tempProductList;

        for (var i = 0; i < this.productList.length; i++) {

          this.productList[i].supplierName = this.supplierList.find(x => x.supplierID == this.productList[i].supplierID).companyName;
          this.productList[i].categoryName = this.categoryList.find(x => x.categoryID == this.productList[i].categoryID).categoryName;

        }
        this.selectProduct = null;
      });
    }
    else {
      this.productService.editProduct(this.selectProduct.productID, this.selectProduct).then(result => {
        tempProductList[this.indexOfProduct] = result;
        this.productList = tempProductList;
        this.selectProduct = null;
      });
    }
  }

  cancelProduct() {
    this.selectProduct = null;
  }
}
