export function isWeekend(date) {
  if (date.format('dddd') === 'Sunday' || date.format('dddd') === 'Saturday') {
    return 'Today is holiday';
  } else {
    return 'Working days';
  }
};

export default isWeekend;