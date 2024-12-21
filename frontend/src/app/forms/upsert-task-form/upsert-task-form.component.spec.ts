import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertTaskFormComponent } from './upsert-task-form.component';

describe('UpsertTaskFormComponent', () => {
  let component: UpsertTaskFormComponent;
  let fixture: ComponentFixture<UpsertTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertTaskFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpsertTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
