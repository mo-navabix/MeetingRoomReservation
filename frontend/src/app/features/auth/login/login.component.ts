import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],

  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  isLoading = false;

  errorMessage = '';

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],

    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        console.log(response);

        localStorage.setItem('accessToken', response.accessToken);

        this.router.navigate(['/']);
      },

      error: (err) => {
        this.errorMessage = err.error.message ?? 'خطایی رخ داده است';

        this.isLoading = false;
      },
    });
  }
}
