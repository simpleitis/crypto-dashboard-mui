import { CHANGE_CURRENCY } from './currencyType';

export const changeCurrency = (type = 'USD', symbol = '$') => {
  return {
    type: CHANGE_CURRENCY,
    payload: { type: type, symbol: symbol },
  };
};
