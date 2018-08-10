import { FIXED_DIGITS } from '../config';

export const getRisk = ({ prize, chanceToWin }) => {
  return prize * chanceToWin / (100 - chanceToWin);
};

export const toFixedIfNeed = (val) => {
  return parseFloat(val.toFixed(FIXED_DIGITS));
};
