// ----------------------------------
// HELPERS
// ----------------------------------
export const transactionIsPayback = ({ tags }) => tags.includes('payBack');
export const transactionIsUntagged = ({ tags }) => tags[0] === '';
