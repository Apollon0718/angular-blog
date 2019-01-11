import { getTestBed, TestBed } from '@angular/core/testing';
import { PostsService } from '../posts.servece';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { Post } from '../../models/post.model';

const mockData = [{
    author: {
      avatar: 'ava',
    name: 'string',
    type: 'string',
    id: 'id'
    },
    body: 'body',
    image: 'img',
    id: 'id',
    title: 'title'
  }] as Post[]
;
const mockNewPost = {
  body: 'body',
  title: 'title',
  image: 'img'
};
const mockPost = mockData[0];
const id = 'id';

describe('PostsService', () => {
  let injector: TestBed;
  let postsService: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService]
    });
    injector = getTestBed();
    postsService = injector.get(PostsService);
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(postsService).toBeTruthy();
  });

  describe('getPost', () => {
    it('should return an Observable<Post[]>', () => {
      postsService.getPosts().subscribe(post => {
        expect(post.length).toBe(1);
        expect(post).toEqual(mockData);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/posts`);
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });
  });

  describe('createNewPost', () => {
    it('should return an Observable<Post>', () => {
      postsService.createNewPost(mockNewPost).subscribe(post => {
        expect(post).toEqual(mockPost);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/posts`);
      expect(req.request.method).toBe('POST');
      req.flush(mockPost);
    });
  });

  describe('editPost', () => {
    it('should return an Observable<Post>', () => {
      postsService.editPost(id, mockPost).subscribe(post => {
        expect(post).toEqual(mockPost);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/posts/id`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockPost);
    });
  });
});
