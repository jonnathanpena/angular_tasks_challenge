export const scriptValidatorFailedCases = [
  '<script>alert(1)</script>',
  '<b>Hello</b>',
  '<svg><script>alert(14)</script></svg>',
];

export const scriptValidatorSuccessCases = [
  'alert(1)',
  'Hello',
  'alert(14)',
];