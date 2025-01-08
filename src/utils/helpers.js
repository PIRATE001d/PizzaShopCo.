// helpers.js

export function formatCurrency(value) {
  // Format as currency in EUR
  const options = { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 };
  const formattedValue = value.toLocaleString('en', options);
  return `€${formattedValue}`;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('en', { month: 'short' });
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${day} ${month}, ${hours}:${minutes}`;
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}
