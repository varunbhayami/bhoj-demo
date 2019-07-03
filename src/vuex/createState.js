const state = {
  globalSetting:[],
  userData: null,
  cuisinelist: [],
  delivery_menu:[]
};

const createState = customState => Object.assign({}, state, customState);

export default createState;
