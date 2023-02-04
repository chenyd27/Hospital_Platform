import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreminderComponent } from './addreminder.component';

describe('AddreminderComponent', () => {
  let component: AddreminderComponent;
  let fixture: ComponentFixture<AddreminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddreminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
