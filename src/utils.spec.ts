import { getHours } from './utils';

describe('Utils', () => {
  it('#getHours', () => {
    const timer = getHours(1);
    const timer1 = getHours(2);

    expect(timer).toEqual(1000 * 60 * 60);
    expect(timer1).toEqual(1000 * 60 * 60 * 2);
  });
});
