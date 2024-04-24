import { Component } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Gender, genderLabels, genderToNumber } from '../../models/gender';
import { CommonModule } from '@angular/common';
// import { getEnumKeyValuePairs } from '../../utility/enum-handler';
import { Role } from '../../models/role';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';

// import { JwtModule } from '@auth0/angular-jwt';
//7271


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    NzFlexModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzGridModule,
    NzSpinModule,

    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  registerForm!: FormGroup
  signingIn: boolean = false
  errorMessage: string = '';
  // genderLabels: 

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      cnic: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{7}-\d{1}$/)]],
    })
    
  }

  get getGenderLabels(){
    return genderLabels;
  }

  async submitForm(){
    if(this.registerForm.controls['password'].value !== this.registerForm.controls['confirmPassword'].value){
      this.errorMessage = 'Passwords do not match'; 
      return;
    }

    if(this.registerForm.valid){
      this.signingIn = true;
      const newUser: User = this.registerForm.value;
      newUser.role = Role.Customer;
      // console.log(newUser);
      try{
        const responseUser = await this.authService.register(newUser);
        this.signingIn = false;
        // navigate to login
        this.router.navigate(['/login']);
      }
      catch(error){
        this.signingIn = false;
        this.errorMessage = 'Registration failed. Please try again.';
        console.log(error);
      }
    }else{
      Object.values(this.registerForm.controls).forEach(control => {
        if(control.invalid){
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      })
    }
  }

  handleChange(e:any){
console.log(e);
  }
}
