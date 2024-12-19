/**
 * Validation for email input pattern
 * @param {string|undefined} value String input to validate
 * @return {boolean} True if valid, false if not
 */
export const emailValidationPattern = (value?: string): boolean => {
  if (!value) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};
