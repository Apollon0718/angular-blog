import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TokenService } from '../shared/services/token.service';
import { TokenServiseStub } from '../shared/services/service-stub/token-stub.servise';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ HeaderComponent ],
      providers: [{provide: TokenService, useClass: TokenServiseStub}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
