export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString();
}

export function formatDateTime(date: Date): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}