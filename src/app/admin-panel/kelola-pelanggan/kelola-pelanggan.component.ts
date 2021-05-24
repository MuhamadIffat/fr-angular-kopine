import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, DefaultUrlSerializer } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-kelola-pelanggan',
  templateUrl: './kelola-pelanggan.component.html',
  styleUrls: ['./kelola-pelanggan.component.scss']
})
export class KelolaPelangganComponent implements OnInit {

  pageName="Kelola Pelanggan"
  public employees: User[];
  public editEmployee: User;
  public deleteEmployee: User;
  id: number;
  user: User;
  constructor(private memberService: HttpService) { }

  ngOnInit(): void {
        this.getAllPelanggan();
  }

  public getAllPelanggan():void{
    this.memberService.getUsers().subscribe(
      (response:User[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      } 
    )
  }

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.memberService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getAllPelanggan();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: User): void {
    this.memberService.updateUser(employee).subscribe(
      (response: User) => {
        console.log(response);
        this.getAllPelanggan();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.memberService.deleteUser(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllPelanggan();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: User, mode: string): void {
    console.log('masuk openmodal');
    const container1 = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container1.appendChild(button);
    button.click();
  }

}
