// import { scriptValidatorFailedCases } from '../utils/__mocks__/no-script-validator.mocks';
import { NoScriptValidator } from './no-script-validator';

describe('NoScriptValidator', () => {
  it('should create an instance', () => {
    expect(new NoScriptValidator()).toBeTruthy();
  });

  /* describe('When input text has a script value', () => {
    it.each( scriptValidatorFailedCases )(
      'should sanitize input correctly for $name field with value "$input"',
      ({ input, name, expected }) => {
        const { result } = renderHook(() => useSanitizedInput( '' ));
  
        act(() => {
          result.current.onChange({
            target: { value: input, name },
          } as ChangeEvent<HTMLInputElement> );
        });
  
        expect( result.current.value ).toBe( expected );
      },
    );
  });*/
});
