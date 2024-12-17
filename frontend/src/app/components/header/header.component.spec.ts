import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When header component render', () => {
    it('Should show img tag with specific path', () => {
      const headerComponentImage = fixture.debugElement.query(By.css('img'));

      expect(headerComponentImage).toBeTruthy();
      expect(headerComponentImage.attributes['src']).toEqual('assets/images/logo-atom-chat.png');
    });
  });
});
