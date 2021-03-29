// ----------------------------------
// HELPERS
// ----------------------------------
export const isPayback = (tags) => tags.includes('payBack');
export const isUntagged = (tags) => tags[0] === '';
