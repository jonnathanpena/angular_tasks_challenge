import { ButtonStylesClasses } from './button-styles-classes';

describe('ButtonStylesClasses', () => {
  it('should create an instance', () => {
    expect(new ButtonStylesClasses()).toBeTruthy();
  });

  it('Should return full-width prop', () => {
    const buttonStylesClasses = new ButtonStylesClasses();
    const classes = buttonStylesClasses.setFullWith().build();

    console.log( 'classes', classes );

    expect( classes ).toEqual({
      'full-width': true
    });
  });
});
