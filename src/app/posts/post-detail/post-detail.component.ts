import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Post } from '../../shared/models/post.model';
import { PostsService } from '../../shared/services/posts.servece';
import { concatMap, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  createPost: FormGroup;
  post: Post;
  id;
  file: File;
  newPost;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createPost = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
     this.newPost = this.route.snapshot.data['isNewPost'];

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getId();
    }
  }

  getId() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getPostById(params['id']);
        })
      )
      .subscribe(data => {
        this.createPost.setValue({
          body: data.body,
          title: data.title
        });
        this.post = data;
      });
  }

  loadImg(event) {
    this.file = event.target.files[0];
    if (this.id !== null) {
      this.postsService.addImg(this.id, this.file).subscribe(data => {
        this.post = data;
      });
    }
  }
  savePost() {
    const body = this.createPost.value;
    if (this.id) {
      console.log(this.id);
      this.postsService.editPost(this.id, body).subscribe(post => {
        this.router.navigate(['posts/my-post']);
      });
    } else {
      this.postsService
        .createNewPost(body)
        .pipe(
          tap(res => console.log(res)),
          concatMap(data => {
            this.id = data.id;
            return this.postsService.addImg(this.id, this.file);
          })
        )
        .subscribe(post => {
          this.post = post;
          this.router.navigate(['posts/my-post']);
        });
    }
  }

  deletePost() {
    if (this.id) {
      this.postsService.delPostbyId(this.id).subscribe();
      this.router.navigate(['posts/my-post']);
    }
  }

  deleteImg() {
    this.postsService.delImg(this.id).subscribe(data => {
      this.post = data;
    });
  }
}
