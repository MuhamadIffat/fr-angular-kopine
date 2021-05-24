import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { Products } from 'src/app/model/products';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-kelola-produk',
  templateUrl: './kelola-produk.component.html',
  styleUrls: ['./kelola-produk.component.scss']
})
export class KelolaProdukComponent implements OnInit {

  categoryList: Category[];
  pageName="Kelola Produk";
  public employees: Products[];
  public editEmployee: Products;
  public deleteEmployee: Products;
  userFile;
  imgURL:any;
  public imagePath;
  id: number;
  user: Products;
  public message: string;
  constructor(public productService: ProductsService,public categoryService: CategoryService,public fb: FormBuilder) { }
  get f() { return this.productService.dataForm.controls; }
  ngOnInit(): void {
        this.getAllProducts();
        this.categoryService.getCategorys().subscribe(response => {
          this.categoryList = response;
        });
        this.infoForm();
  }

  infoForm() {
    this.productService.dataForm = this.fb.group({
        id: null,
        name: ['', [Validators.required]],
        price: ['0', [Validators.required]],
        id_category: ['', [Validators.required]],
        stock: ['0', [Validators.required]],
        profile : [],
      });
    }
  public getAllProducts():void{
    this.productService.getProducts().subscribe(
      (response:Products[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      } 
    )
  }

  public onAddProducts(): void {
    document.getElementById('add-products-form').click();
    const formData = new  FormData();
    const product = this.productService.dataForm.value;
    formData.append('product',JSON.stringify(product));
    formData.append('file',this.userFile);
    this.productService.addUser(formData).subscribe(
      (response) => {
        console.log(response);
        this.getAllProducts();
        this.productService.dataForm.reset();
        

        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
      this.f['profile'].setValue(file);
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
     
      
    }

  public onUpdateProducts(employee: Products): void {
    this.productService.updateProducts(employee).subscribe(
      (response: Products) => {
        console.log(response);
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  updateData()
  {
    this.productService.updatedata(this.productService.dataForm.value.id,this.productService.dataForm.value).
    subscribe( data => {
      console.log(data);
      this.getAllProducts();
    });
  }

  public onDeleteProducts(employeeId: number): void {
    this.productService.deleteProducts(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Products, mode: string): void {
    console.log('masuk openmodal');
    const container1 = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProductsModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      this.productService.dataForm = this.fb.group(Object.assign({},this.editEmployee));
      button.setAttribute('data-target', '#updateProductsModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteProductsModal');
    }
    container1.appendChild(button);
    button.click();
  }
  

}
