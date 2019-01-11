import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from '../../shared/models/user.model';
import { TokenService } from '../../shared/services/token.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Observable<User>;
  show = false;
  file: File;
  constructor(
    public tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.tokenService.profileSubject;
    }

  editAvatar() {
    this.show = true;
  }

  loadImg(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    this.user = this.authService.editAvatar(this.file);
    this.show = false;
   }
  }
