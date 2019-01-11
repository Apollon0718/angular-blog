import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenService } from '../services/token.service';

import { User } from '../models/user.model';


@Directive({ selector: '[appCurrentUser]'})
export class CurrentUserDirective implements OnInit  {
@Input() appCurrentUser: number;
currentUser: User;

    constructor(
        private tokenService: TokenService,
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>) {}


     ngOnInit() {
        this.tokenService.profileSubject
        .subscribe(data => {
            console.log(data.id === this.appCurrentUser);
            if (data.id === this.appCurrentUser) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
            console.log(this.appCurrentUser);
            console.log(data.id);
        });
    }


}

