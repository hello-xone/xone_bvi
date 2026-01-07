export const formatAddress = (address: string, maxLen = 8) => {
  if (!address) return '';
  if (!maxLen) return address;
  return `${address.slice(0, maxLen)}...${address.slice(-maxLen)}`;
};
