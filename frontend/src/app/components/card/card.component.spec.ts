import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { cardExtraClassName, cardSubtitle, cardTitle } from '../../utils/__mocks__/card-component.mocks';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When cardTitle input has passed or not', () => {
    it('Should show card title text', () => {
      component.cardTitle = cardTitle;
      fixture.detectChanges();

      const cardElement = fixture.debugElement.children[0];

      expect(cardElement.nativeElement.textContent).toContain(cardTitle);
    });

    it('Should not show card title text', () => {
      const cardElement = fixture.debugElement.children[0];

      expect(cardElement.nativeElement.textContent).toEqual('');
    });
  });

  describe('When cardSubtitle input has passed or not', () => {
    beforeEach(() => {
      component.cardTitle = cardTitle;
      fixture.detectChanges();
    });

    it('Should show cardSubtitle text', () => {
      component.cardSubtitle = cardSubtitle;
      fixture.detectChanges();

      const cardElementP = fixture.debugElement.query(By.css('p'));
      const cardElement = fixture.debugElement.children[0].children[0];

      expect(cardElement.nativeElement.textContent).toContain(cardSubtitle);
      expect(cardElementP.nativeElement.textContent).toContain(cardSubtitle);
    });

    it('Should not show cardSubtitle text', () => {
      const cardElementP = fixture.debugElement.query(By.css('p'));

      expect(cardElementP?.nativeElement).toEqual(undefined);
    });
  });

  describe('When extraClassName input has passed or not', () => {
    beforeEach(() => {
      component.cardTitle = cardTitle;
      fixture.detectChanges();
    });

    it('Should show extraClassName', () => {
      component.extraClassName = cardExtraClassName;
      fixture.detectChanges();
      const cardElement = fixture.debugElement.children[0];

      expect(cardElement.classes[cardExtraClassName]).toBeTruthy();
    });

    it('Should not show extraClassName', () => {
      const cardElement = fixture.debugElement.children[0];

      expect(cardElement.classes[cardExtraClassName]).not.toBeTruthy();
    });
  });
});
