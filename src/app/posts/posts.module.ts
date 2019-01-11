import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { PostIndexComponent } from './post-index/post-index.component';
import { PostOverviewComponent } from './post-overview/post-overview.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsRoutingModule } from './posts.routing.module';
import { PostComponent } from './post-index/post/post.component';
import { CurrentUserDirective } from '../shared/directives/current-user.directive';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PostsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    PostIndexComponent,
    PostOverviewComponent,
    PostDetailComponent,
    PostComponent,
    CurrentUserDirective
  ]
})
export class PostsModule { }
