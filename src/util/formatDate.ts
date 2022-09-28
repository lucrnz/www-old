export const formatDate = (date: Date): string =>
    new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC', dateStyle: 'medium' });
