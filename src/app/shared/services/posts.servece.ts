import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Jsona } from 'jsona/lib';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Post } from '../models/post.model';

@Injectable()
export class PostsService {
    jsona: Jsona;
  constructor(private http: HttpClient) {
    this.jsona = new Jsona();
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/api/posts`);
  }
  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/api/posts/${id}`);
  }
  getMyPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/api/my_posts`);
  }
  delPostbyId(id: string): Observable<any> {
      return this.http.delete<any>(`${environment.apiUrl}/api/posts/${id}`);
  }

  createNewPost(body): Observable<Post> {
    const newPost = this.jsona.serialize({
        stuff: { ...body, type: 'post' }
      });
      return this.http.post<Post>(`${environment.apiUrl}/api/posts`, newPost);
  }

  editPost(id: string, body): Observable<Post> {
    const editPost = this.jsona.serialize({
      stuff: { ...body, type: 'post' }
    });
    return  this.http.put<Post>(`${environment.apiUrl}/api/posts/${id}`, editPost);
  }

   addImg(id: string, img: File): Observable<any> {
     const postImg = new FormData();
     postImg.append('image', img);
     return this.http.put<any>(`${environment.apiUrl}/api/posts/${id}/image`, postImg);
  }

  delImg(id: string): Observable<Post> {
    return this.http.delete<Post>(`${environment.apiUrl}/api/posts/${id}/image`);
  }
}
