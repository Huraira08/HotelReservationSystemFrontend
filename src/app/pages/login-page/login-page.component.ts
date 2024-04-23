import { Component } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    NzFlexModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  async submitForm(){
    if(this.loginForm.valid){
      const email = this.loginForm.value['email']
      const password = this.loginForm.value['password']
      try{
        const response = await this.authService.login(email, password)
      this.authService.setToken(response!.token, response!.user);
      // this.authService.isAdmin();
      this.router.navigate(['/home'])
      }catch(e){
        console.log(e)
      }
    }else{
      Object.values(this.loginForm.controls).forEach(control => {
        if(control.invalid){
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      })
    }
  }
}
