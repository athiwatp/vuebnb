import axios from 'axios';

function getData(to) {
  return new Promise((resolve) => {
    let initialState = JSON.parse(window.vuebnb_listing_model) || {};
    if (!initialState.path || to.path !== initialState.path) {
      axios.get(`/api${to.path}`).then(({ data }) => {
        resolve(data);
      });
    } else {
      resolve(initialState);
    }
  });
};

export default {
  methods: {
    assignData(data) {
      Object.assign(this.$data, data);
    }
  },
  beforeRouteEnter: (to, from, next) => {
    getData(to).then((data) => {
      next(component => component.assignData(data));
    });
  }
};
