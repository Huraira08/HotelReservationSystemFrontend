import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { environment } from '../../environments/environment';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResult } from '../../models/login-result';

export interface TokenValidationResponse{
  isExpired: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLoggedIn: boolean = false;
  private isUserLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private user!: User;

  private TOKEN_KEY = 'jwt_token';
  private USER_KEY = 'user';
  private ROLE_KEY = 'role';

  constructor(
    private http: HttpClient,
    // private jtwHelper: JwtHelperService,
     private router: Router
    ) { 
      let token = localStorage.getItem(this.TOKEN_KEY);
      if (token) {
        this.isUserLoggedIn = true;
        this.isUserLoggedInSubject.next(this.isUserLoggedIn);
      }
    }

    isLoggedIn(): Observable<boolean> {
      return this.isUserLoggedInSubject.asObservable();
    }
  
    isAdmin(): boolean{
      const roleData = localStorage.getItem(this.ROLE_KEY);
      const role = JSON.parse(roleData!);
      console.log(role)
      return role === 1;
      // if(role === '1') return true;

      // return false;
      // return this.isAuthenticated
      // if(token){
      //   const decodeToken = this.jtwHelper.decodeToken(token);
      //   const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      //   const roles = decodeToken[roleKey]
      //   return roles.includes('Admin')
      // }
      
    }

  register(newUser:User){
    let promise = firstValueFrom(this.http.post<User>(`${environment.apiPath}/Auth/register`, newUser))
    return promise
  }

  login(email: string, password: string){
    let promise = firstValueFrom(
      this.http.post<LoginResult>(`${environment.apiPath}/Auth/login`, {email, password})
    )
    return promise
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    this.isUserLoggedIn = false;
    this.isUserLoggedInSubject.next(this.isUserLoggedIn);
  }

  setToken(token: string, user: User){
    console.log("login user: ",user)
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.ROLE_KEY, user.role.toString())
    this.isUserLoggedIn = true;
    this.isUserLoggedInSubject.next(this.isUserLoggedIn);
    this.user = user;
  }

  getToken(){
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(){
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isUserLoggedIn = false;
  }

  getUser(){
    const userData = localStorage.getItem(this.USER_KEY)
    // console.log(userData)
    if(userData){
      const user = JSON.parse(userData);
      // console.log(user);
      // console.log(localStorage.getItem(this.USER_KEY)!)
      return user;
    }
    return undefined;
  }

  validateToken(){
    const token = localStorage.getItem(this.TOKEN_KEY)
    if(token){
      const url = 'https://localhost:7129/api/Authentication/validate-token';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      this.http.get<TokenValidationResponse>(url, {headers}).subscribe({
        next: response=>{
          if(response.isExpired){
            this.clearToken();
            this.router.navigate(['/login']);
          }else{
            // console.log("Token is valid")
          }
        },
        error: error=>{
          this.clearToken();
          this.router.navigate(['/login']);
          console.log(error)
        }
      })
    }
    else{
      this.clearToken();
      this.router.navigate(['/login']);
    }
  }
}
