import { combineReducers } from 'redux';
import currencyReducer from './currency/currencyReducer';

const rootReducer = combineReducers({
  currency: currencyReducer,
});

export default rootReducer;
