import { FormControl } from '@angular/forms';
import { scriptValidatorFailedCases, scriptValidatorSuccessCases } from '../utils/__mocks__/no-script-validator.mocks';
import { NoScriptValidator } from './no-script-validator';

describe('NoScriptValidator', () => {
  const noScriptValidator = new NoScriptValidator();
  it('should create an instance', () => {
    expect(noScriptValidator).toBeTruthy();
  });

  describe('When input text has a script value', () => {
    it('Should return script error for <script></script> input value', () => {
      const response = noScriptValidator.validate(
        new FormControl(scriptValidatorFailedCases[0]),
      );

      expect(response).toEqual({
        script: true,
      });
    });

    it('Should return script error for <b></b> input value', () => {
      const response = noScriptValidator.validate(
        new FormControl(scriptValidatorFailedCases[1]),
      );

      expect(response).toEqual({
        script: true,
      });
    });

    it('Should return script error for <svg></svg> input value', () => {
      const response = noScriptValidator.validate(
        new FormControl(scriptValidatorFailedCases[2]),
      );

      expect(response).toEqual({
        script: true,
      });
    });
  });

  describe('When input text is not a script value', () => {
    scriptValidatorSuccessCases.forEach(( value ) => {
      it(`Should return null for ${value} value`, () => {
        const response = noScriptValidator.validate(
          new FormControl(value),
        );
  
        expect(response).toEqual(null);
      });
    });
  });
});
