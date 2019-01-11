import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenaveComponent } from './sidenave/sidenave.component';
import { PostsService } from './shared/services/posts.servece';
import { AuthService } from './shared/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JsonApiInterseptor } from './shared/interseptors/jsonapi.interseptors';
import { TokenInterseptor } from './shared/interseptors/token-interseptor';
import { TokenService } from './shared/services/token.service';
import { ProfileGuard } from './shared/guards/profile.guard';
import { CurrentUserDirective } from './shared/directives/current-user.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenaveComponent,
    // CurrentUserDirective
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PostsService,
    AuthService,
    TokenService,
    ProfileGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JsonApiInterseptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterseptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
