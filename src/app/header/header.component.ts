import { Component, OnInit } from '@angular/core';
import { TokenService } from '../shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public tokenService: TokenService, private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.tokenService.delToken();
  }

  goToLogin() {
    if (this.tokenService.isLogIn()) {
     this.router.navigate(['profile/profile']);
    }
  }
}
