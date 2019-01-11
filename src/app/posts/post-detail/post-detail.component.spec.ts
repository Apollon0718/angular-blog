import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MOCK_ROUTES } from '../../test-helpers/router.mock';
import { PostsService } from '../../shared/services/posts.servece';
import { of } from 'rxjs';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { MOCK_POST } from '../../test-helpers/post-id.mock';
import { MockPostsService } from '../../shared/services/service-stub/posts.service.mock';

const event = 'event';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(MOCK_ROUTES),
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [PostDetailComponent],
      providers: [
        // { provide: PostsService, useValue: postsService },
        { provide: PostsService, useClass: MockPostsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: ['isNewPost'],
              paramMap: {
                get: () => {
                  return 'id';
                }
              }
            },
            params: of({})
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call savePost metod', async() => {
    spyOn(component, 'savePost');
    fixture.detectChanges();
    await fixture.whenStable();
    const btn = document.querySelector('.save') as HTMLElement;
    btn.click();
    expect(component.savePost).toHaveBeenCalled();
  });

  it('should call deletePost metod', async() => {
    spyOn(component, 'deletePost');
    fixture.detectChanges();
    await fixture.whenStable();
    const btn = document.querySelector('.del') as HTMLElement;
    btn.click();
    expect(component.deletePost).toHaveBeenCalled();
  });

  it('should call loadImg method', async() => {
    spyOn(component, 'loadImg');
    fixture.detectChanges();
    await fixture.whenStable();
    const btn = document.querySelector('label') as HTMLElement;
    btn.click();
    await fixture.whenStable();
    component.loadImg(event);
    expect(component.loadImg).toHaveBeenCalled();
  });

  it('should call getId metod', async() => {
    spyOn(component, 'getId');
    fixture.detectChanges();
    await fixture.whenStable();
    component.ngOnInit();
    expect(component.getId).toHaveBeenCalled();
  });
});
