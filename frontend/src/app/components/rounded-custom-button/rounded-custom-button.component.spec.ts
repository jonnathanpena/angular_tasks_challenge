import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedCustomButtonComponent } from './rounded-custom-button.component';

describe('RoundedCustomButtonComponent', () => {
  let component: RoundedCustomButtonComponent;
  let fixture: ComponentFixture<RoundedCustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundedCustomButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoundedCustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
