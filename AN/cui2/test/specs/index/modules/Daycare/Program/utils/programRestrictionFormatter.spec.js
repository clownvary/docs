import {
  formatGradeRestriction,
  formatAgeRestriction
} from 'index/modules/Daycare/Program/utils';

describe('index/modules/Daycare/Program/utils/programRestrictionFormatter', () => {
  it('formatGradeRestriction shall returns grade restriction text correctly', () => {
    const grade5 = '5th';
    const grade9 = '9th';

    expect(formatGradeRestriction(grade5, grade9))
      .toEqual('Grade 5th - 9th');
    expect(formatGradeRestriction(grade5, grade5))
      .toEqual('Grade 5th');
    expect(formatGradeRestriction(grade5, ''))
      .toEqual('Grade 5th+');
    expect(formatGradeRestriction(null, grade9))
      .toEqual('Up to Grade 9th');
    expect(formatGradeRestriction(null, ''))
      .toEqual('');
  });

  it('formatAgeRestriction shall returns age restriction text correctly', () => {
    expect(formatAgeRestriction([0, 0, 0], [0, 0, 0])).toEqual('');
    expect(formatAgeRestriction([1, 0, 0], [0, 0, 0])).toEqual('1 yr +');
    expect(formatAgeRestriction([1, 0, 0], [1, 0, 0])).toEqual('1 yr');
    expect(formatAgeRestriction([2, 0, 0], [0, 0, 0])).toEqual('2 yrs +');
    expect(formatAgeRestriction([2, 0, 0], [2, 0, 0])).toEqual('2 yrs');
    expect(formatAgeRestriction([0, 0, 0], [1, 0, 0])).toEqual('Up to 1 yr');
    expect(formatAgeRestriction([0, 0, 0], [2, 0, 0])).toEqual('Up to 2 yrs');
    expect(formatAgeRestriction([1, 0, 0], [2, 0, 0])).toEqual('1 - 2 yrs');
    expect(formatAgeRestriction([2, 3, 0], [0, 0, 0])).toEqual('2y 3m +');
    expect(formatAgeRestriction([2, 0, 4], [0, 0, 0])).toEqual('2y 4w +');
    expect(formatAgeRestriction([2, 3, 4], [0, 0, 0])).toEqual('2y 3m 4w +');
    expect(formatAgeRestriction([0, 0, 0], [2, 3, 0])).toEqual('Up to 2y 3m');
    expect(formatAgeRestriction([0, 0, 0], [2, 0, 4])).toEqual('Up to 2y 4w');
    expect(formatAgeRestriction([0, 0, 0], [2, 3, 4])).toEqual('Up to 2y 3m 4w');
    expect(formatAgeRestriction([1, 2, 3], [2, 3, 4])).toEqual('1y 2m 3w - 2y 3m 4w');
  });
});
