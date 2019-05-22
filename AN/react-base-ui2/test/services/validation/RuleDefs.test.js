import globalRuleDefs from 'src/services/validation/RuleDefs';
import SysRules from 'src/services/validation/rules';

describe('services/validation/RuleDefs.js', () => {
  test('basic usage', () => {
    expect(globalRuleDefs.rules).toEqual({ ...SysRules });

    expect(globalRuleDefs.has('required')).toBe(true);
    expect(globalRuleDefs.has('unknown')).toBe(false);

    expect(globalRuleDefs.get('required')).toEqual(SysRules.required);

    try {
      globalRuleDefs.register();
    } catch (e) {
      expect(e.message).toBe('Register needs a name.');
    }

    globalRuleDefs.register('test');
    expect(globalRuleDefs.has('test')).toBe(true);

    try {
      globalRuleDefs.register('test');
    } catch (e) {
      expect(e.message).toBe('Duplicated rule (test).');
    }

    globalRuleDefs.clear('test');
    expect(globalRuleDefs.has('test')).toBe(false);
  });
});
