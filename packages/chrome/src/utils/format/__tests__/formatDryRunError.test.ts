import formatDryRunError from '../formatDryRunError';

describe('formatDryRunError', function () {
  test('insufficientCoinBalance', function () {
    const error = {
      message: 'InsufficientCoinBalance in command 0',
    };
    expect(formatDryRunError(error)).toBe(
      'Insufficient Coin Balance, please check your balance'
    );
  });

  test('no SUI or cannot split SUI for gas payment', function () {
    const error = {
      message: 'No valid gas coins found for the transaction',
    };
    expect(formatDryRunError(error)).toBe(
      'No valid SUI to pay the gas, please check your balance'
    );
  });

  test('balance is less than needed gas', function () {
    const error = {
      message:
        'Error checking transaction input objects: GasBalanceTooLow { gas_balance: 900000, needed_gas_amount: 1053000 }',
    };
    expect(formatDryRunError(error)).toBe(
      'Insufficient SUI Balance (0.0009 SUI), the needed gas is 0.00105 SUI'
    );

    const abnormalError = {
      message: 'Error checking transaction input objects: GasBalanceTooLow',
    };
    expect(formatDryRunError(abnormalError)).toBe(
      'Insufficient SUI Balance, please check your balance'
    );
  });

  test('unknown error', function () {
    const error = {
      message: 'blablabla',
    };
    expect(formatDryRunError(error)).toBe('Unknown error');
  });
});
