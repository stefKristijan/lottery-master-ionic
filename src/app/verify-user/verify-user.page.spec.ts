import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUserPage } from './verify-user.page';

describe('VerifyUserPage', () => {
  let component: VerifyUserPage;
  let fixture: ComponentFixture<VerifyUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
