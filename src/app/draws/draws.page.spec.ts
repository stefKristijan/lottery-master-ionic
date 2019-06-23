import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawsPage } from './draws.page';

describe('DrawsPage', () => {
  let component: DrawsPage;
  let fixture: ComponentFixture<DrawsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
