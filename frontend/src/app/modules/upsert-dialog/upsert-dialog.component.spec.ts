import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertDialogComponent } from './upsert-dialog.component';

describe('UpsertDialogComponent', () => {
  let component: UpsertDialogComponent;
  let fixture: ComponentFixture<UpsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
