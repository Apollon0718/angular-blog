import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.signIn();
  }

  signIn() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required]]
    });
  }

  registrationFormInfo() {
    const registrationInfo = this.registrationForm.value;
    if (registrationInfo) {
      this.authService.createNewUser(registrationInfo).subscribe(
        user => {
          this.router.navigate(['posts/my-post']);
          console.log(user);
        },
        err => {
          console.log(err);
          alert('Something went wrong. Please try again');
        }
      );
    }
  }

  getErrorMessage() {
    return this.registrationForm.get('email').hasError('required')
      ? 'You must enter a value'
      : this.registrationForm.get('email').hasError('email')
        ? 'Not a valid email'
        : '';
  }

  getErrorMessagePas() {
    return this.registrationForm.get('password').hasError('minlength')
      ? 'Password must be at least 9 characters long.'
      : '';
  }
}
