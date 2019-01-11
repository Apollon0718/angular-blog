import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostIndexComponent } from './post-index.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PostsService } from '../../shared/services/posts.servece';
import { of } from 'rxjs';
import { TokenService } from '../../shared/services/token.service';
import { TokenServiseStub } from '../../shared/services/service-stub/token-stub.servise';

describe('AllPostsComponent', () => {
  let component: PostIndexComponent;
  let fixture: ComponentFixture<PostIndexComponent>;
  let postsService;

  beforeEach(async(() => {
    postsService = jasmine.createSpyObj('PostsService', ['getPosts']);
    const postsSpy = postsService.getPosts.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ PostIndexComponent ],
      providers: [
        {provide: PostsService, useValue: postsService},
        {provide: TokenService, useClass: TokenServiseStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'getPost');
  });

  it('should create', async() => {
    expect(component).toBeTruthy();
  });

  it('should call getPost metod', async() => {
    spyOn(component, 'getMyPost');
    component.myPost = false;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(postsService.getPosts).toHaveBeenCalled();
    // expect(component.getMyPost).toHaveBeenCalled();
    // expect(component.getPost).toHaveBeenCalled();
  });
});
