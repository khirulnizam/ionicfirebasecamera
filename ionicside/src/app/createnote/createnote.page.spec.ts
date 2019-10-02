import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenotePage } from './createnote.page';

describe('CreatenotePage', () => {
  let component: CreatenotePage;
  let fixture: ComponentFixture<CreatenotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
