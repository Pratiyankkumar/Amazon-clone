import {formatCurrency} from '../../scripts/utils/money.js';

describe('test suite: format Currency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest count', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01')
  });

  it('rounds down to the nearest count', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00')
  })
  it('checks with negative number', () => {
    expect(formatCurrency(-2000.5)).toEqual('-20.00')
  })
})