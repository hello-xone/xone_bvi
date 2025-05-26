import BigNumber from 'bignumber.js';

export const IsNumberZero = (number?: string | number | BigNumber) => {
  return BigNumber(number || 0).eq(0);
};

export function checkMobile(): boolean {
  const isMobileDevice = /Android|iPhone|iPad|iPod|Windows Phone|BlackBerry/i.test(
    navigator.userAgent
  );

  const isSmallScreen = window.innerWidth < 767;

  return isMobileDevice || isSmallScreen;
}
