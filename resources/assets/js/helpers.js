let amenities = new Map();
amenities.set('amenity_wifi', { title: 'Wireless Internet', icon: 'fa-wifi' });
amenities.set('amenity_pets_allowed', { title: 'Pets Allowed', icon: 'fa-paw' });
amenities.set('amenity_tv', { title: 'TV', icon: 'fa-television' });
amenities.set('amenity_kitchen', { title: 'Kitchen', icon: 'fa-cutlery' });
amenities.set('amenity_breakfast', { title: 'Breakfast', icon: 'fa-coffee' });
amenities.set('amenity_laptop', { title: 'Laptop friendly workspace', icon: 'fa-laptop' });

let prices = new Map();
prices.set('price_per_night', 'Per night');
prices.set('price_extra_people', 'Extra people');
prices.set('price_weekly_discount', 'Weekly discount');
prices.set('price_monthly_discount', 'Monthly discount');

let populateAmenitiesAndPrices = function(state) {
  state.amenities = [];
  state.prices = [];
  state.images = [];
  for (let key in state) {
    let arr = key.split("_");
    if (arr[0] === 'amenity') {
      if (state[key]) {
        state.amenities.push(key);
      }
      delete state[key];
    }
    if (arr[0] === 'price') {
      state.prices.push({ title: key, value: state[key]});
      delete state[key];
    }
    if(arr[0] === 'image') {
      state.images.push(state[key]);
      delete state[key];
    }
  }

  state.amenities = state.amenities.map(item => amenities.get(item) );

  state.prices = state.prices.map(item => {
    item.title = prices.get(item.title);
    return item;
  });

  return state;
};

export { populateAmenitiesAndPrices };
