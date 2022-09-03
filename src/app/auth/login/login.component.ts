import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onLogin() {
    console.log(this.loginForm);
    if(this.loginForm.invalid) {
      alert('invalid login');
      return;
    }

    const username: string = this.loginForm.get('username').value;
    const password: string = this.loginForm.get('password').value;
    alert(`login berhasil dengan user:${ username} pass: ${password}`);
  }
}
