import { Component, OnInit } from '@angular/core';
import { Post } from '../../shared/models/post.model';
import { PostsService } from '../../shared/services/posts.servece';
import { Observable } from 'rxjs';
import { TokenService } from '../../shared/services/token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-index',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.css']
})
export class PostIndexComponent implements OnInit {
  posts: Post[];
  myPost;
  constructor(
    private postsService: PostsService,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.myPost = this.route.snapshot.data['isMyPost'];
    if (this.myPost) {
      this.getMyPost();
    } else {
      this.getPost();
    }
  }

  getPost() {
      this.postsService.getPosts().subscribe(data => {
        this.posts = data;
        console.log(this.posts);
      });
  }
  getMyPost() {
    if (this.tokenService.getToken()) {
      this.postsService.getMyPosts().subscribe(data => {
        this.posts = data;
        /*console.log(this.posts);*/
      });
    }
  }
}
