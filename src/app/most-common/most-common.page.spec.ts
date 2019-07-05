import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostCommonPage } from './most-common.page';

describe('MostCommonPage', () => {
  let component: MostCommonPage;
  let fixture: ComponentFixture<MostCommonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostCommonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostCommonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
