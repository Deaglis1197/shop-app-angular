import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from '../auth-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoading: boolean = false;
  isLoginMode: boolean = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    console.log('auth get');
  }
  changeMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  handleAuth(form: NgForm) {
    if (!form.valid) return;
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authResponse: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authResponse = this.authService.login(email, password);
    } else {
      authResponse = this.authService.register(email, password);
    }
    authResponse.subscribe({
      next: () => {
        this.isLoading = false;
        this.error = '';
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err;
      },
    });
  }
}
