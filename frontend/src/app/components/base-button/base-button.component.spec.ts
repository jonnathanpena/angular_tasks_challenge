import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseButtonComponent } from './base-button.component';
import { By } from '@angular/platform-browser';

describe('BaseButtonComponent', () => {
  let component: BaseButtonComponent;
  let fixture: ComponentFixture<BaseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When no type input has passed', () => {
    it('Should render a normal type button', () => {
      const baseButtonElement = fixture.debugElement.children[0];

      expect(baseButtonElement.classes['atom-rounded-custom-button']).not.toBeTruthy();
    });
  });

  describe('When type input has passed', () => {
    it('Should return css rounded class name', () => {
      component.type = 'rounded';
      fixture.detectChanges();
      const baseRoundedButtonElement = fixture.debugElement.children[0];

      expect(baseRoundedButtonElement.classes['atom-rounded-custom-button']).toBeTruthy();
    });
  });

  describe('When background is defined and not defined', () => {
    it('Should return css mat-primary class name', () => {
      component.type = 'rounded';
      component.backgroundColor = 'primary';
      fixture.detectChanges();
      const baseButtonElement = fixture.debugElement.children[0];

      expect(baseButtonElement.classes['mat-primary']).toBeTruthy();
    });

    it('Should return css mat-unthemed class name', () => {
      component.type = 'rounded';
      fixture.detectChanges();
      const baseButtonElement = fixture.debugElement.children[0];

      expect(baseButtonElement.classes['mat-unthemed']).toBeTruthy();
    });
  });

  describe('When button text has passed or not', () => {
    it('Should render text button', () => {
      const buttonText = 'Continuar';
      component.type = 'rounded';
      component.buttonText = buttonText;
      fixture.detectChanges();

      const baseButtonElement = fixture.debugElement.children[0];

      expect(baseButtonElement.nativeElement.textContent).toContain(buttonText);
    });

    it('Should render without text button', () => {
      component.type = 'rounded';
      fixture.detectChanges();

      const baseButtonElement = fixture.debugElement.children[0];

      expect(baseButtonElement.nativeElement.textContent).toContain('');
    });
  });

  describe('When disabled input has passed or not', () => {
    it('Should return class name button disabled', () => {
      component.type = 'rounded';
      component.isDisabled = true;
      fixture.detectChanges();
      const baseButtonElement = fixture.debugElement.children[0];

      expect(baseButtonElement.classes['mat-mdc-button-disabled']).toBeTruthy();
    });

    it('Should not return class name button disabled', () => {
      component.type = 'rounded';
      fixture.detectChanges();
      const baseButtonElement = fixture.debugElement.children[0];

      expect(baseButtonElement.classes['mat-mdc-button-disabled']).not.toBeTruthy();
    });
  });

  describe('When isFullWith input has passed or not', () => {
    it('Should return class name full-width', () => {
      component.type = 'rounded';
      component.isFullWidth = true;
      fixture.detectChanges();
      const baseButtonElement = fixture.debugElement.children[0];

      expect(baseButtonElement.classes['full-width']).toBeTruthy();
    });

    it('Should not return class name full-width', () => {
      component.type = 'rounded';
      fixture.detectChanges();
      const baseButtonElement = fixture.debugElement.children[0];

      expect(baseButtonElement.classes['full-width']).not.toBeTruthy();
    });
  });
});
