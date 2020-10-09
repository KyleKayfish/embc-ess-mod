import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import IdentifyNeedsComponent from './identify-needs.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('IdentifyNeedsComponent', () => {
  let component: IdentifyNeedsComponent;
  let fixture: ComponentFixture<IdentifyNeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifyNeedsComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifyNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});