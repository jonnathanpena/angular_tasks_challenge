import { FormControl } from '@angular/forms';
import { EmailValidator } from './email-validator';
import { emailValidatorMocks } from '../utils/__mocks__/email-validator.mocks';

describe('EmailValidator', () => {
  const emailValidator = new EmailValidator();
  const { failed, success } = emailValidatorMocks;

  it('should create an instance', () => {
    expect(emailValidator).toBeTruthy();
  });

  describe('When input value is not a valid email pattern', () => {
    it('Should return invalid email if hasn\'t a @', () => {
      const response = emailValidator.validate(
        new FormControl(failed.noArroba),
      );

      expect(response).toEqual({ email: true });
    });

    it('Should return invalid email if hasn\'t a dot', () => {
      const response = emailValidator.validate(
        new FormControl(failed.noDot),
      );

      expect(response).toEqual({ email: true });
    });
  });

  describe('When input value is a valid email pattern', () => {
    it('Should return null if is success response', () => {
      const response = emailValidator.validate(
        new FormControl(success.email),
      );

      expect(response).toEqual(null);
    });
  });
});
