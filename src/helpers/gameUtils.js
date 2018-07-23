export const getOpponentRisk = ({ prize, chanceToWin }) => {
  return (prize * chanceToWin / (100 - chanceToWin)).toFixed(2);
}
