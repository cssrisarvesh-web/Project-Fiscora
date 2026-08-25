export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
};

export const formatPercentage = (val: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(val / 100);
};

export const formatCompact = (val: number, currency: string = 'USD'): string => {
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    notation: 'compact',
    compactDisplay: 'short',
  }).format(val);
};
