const filterGuestsBy = (prop, value, guests) => {
  return value ? guests.filter(m => m[prop] === value) : guests.filter(m => m[prop]);
};

export {filterGuestsBy};