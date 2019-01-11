import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  declarations: [LoginComponent, RegistrationComponent]
})
export class AuthModule { }
