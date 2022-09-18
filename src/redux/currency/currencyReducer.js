import { CHANGE_CURRENCY } from './currencyType';

const initialState = {
  type: 'USD',
  symbol: '$',
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return {
        ...state,
        type: action.payload.type,
        symbol: action.payload.symbol,
      };
    default:
      return state;
  }
};

export default currencyReducer;
