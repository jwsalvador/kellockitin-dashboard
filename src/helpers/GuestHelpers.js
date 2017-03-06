const filterGuestsBy = (prop, value, guests) => {
  return value || value === '' ? guests.filter(m => m[prop] === value) : guests.filter(m => m[prop]);
};

export {filterGuestsBy};