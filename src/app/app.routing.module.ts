import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { ProfileGuard } from './shared/guards/profile.guard';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'posts',
    loadChildren: './posts/posts.module#PostsModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [ProfileGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
