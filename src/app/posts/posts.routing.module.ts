import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PostOverviewComponent } from './post-overview/post-overview.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostIndexComponent } from './post-index/post-index.component';
import { ProfileGuard } from '../shared/guards/profile.guard';

const routes: Routes = [
  {
    path: 'all',
    component: PostIndexComponent
  },
  {
    path: 'my-post',
    component: PostIndexComponent,
    canActivate: [ProfileGuard],
    data: {
      isMyPost: true
    }
  },
  {
    path: 'detail',
    component: PostDetailComponent,
    canActivate: [ProfileGuard],
    data: {
      isNewPost: true
    }
  },

  {
    path: ':id',
    component: PostOverviewComponent
  },
  {
    path: 'detail/:id',
    component: PostDetailComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
