import { ButtonStylesClasses } from './button-styles-classes';

describe('ButtonStylesClasses', () => {
  it('should create an instance', () => {
    expect(new ButtonStylesClasses()).toBeTruthy();
  });

  describe('When build props separadly', () => {
    it('Should return full-width prop', () => {
      const buttonStylesClasses = new ButtonStylesClasses();
      const classes = buttonStylesClasses.setFullWith().build();
  
      expect( classes ).toEqual({
        'full-width': true
      });
    });

    it('Should return atom-rounded-custom-button prop', () => {
      const buttonStylesClasses = new ButtonStylesClasses();
      const classes = buttonStylesClasses.setIsRounded().build();
  
      expect( classes ).toEqual({
        'atom-rounded-custom-button': true
      });
    });
  });

  describe('When call al set methods', () => {
    it('Should return all props object', () => {
      const buttonStylesClasses = new ButtonStylesClasses();
      const classes = buttonStylesClasses.setFullWith().setIsRounded().build();
  
      expect( classes ).toEqual({
        'full-width': true,
        'atom-rounded-custom-button': true
      });
    });
  });
});
