export const scriptValidatorFailedCases = [
  '<script>alert(1)</script>',
  '<b>Hello</b>',
  '<svg><script>alert(14)</script></svg>',
  '<meta http-equiv="refresh" content="0;url=javascript:alert(13)"',
  '<style>body{background: url(javascript:alert(11))}</style>',
  '<img src="x" onload="alert(9)" />',
  '<a href="javascript:alert(5)">Click me</a>',
  '<iframe src="javascript:alert(7)"></iframe>',
  '<object data="data:text/html,<script>alert(12)</script>"></object>',
  '<math><mi//xlink:href="data:x,<script>alert(10)</script>">',
  '<form action="javascript:alert(8)"><input type="submit"></form>',
  '<img src="x" onerror="alert(6)" />',
];

export const scriptValidatorSuccessCases = [
  'alert(1)',
  'Hello</b>',
  '<svg><script>alert(14)',
];