const Restaurants = require('./restaurants');

const renderFunc = require('./template/simple');

const promises = Object.values(Restaurants).map((restaurant) => {
  const inst = new restaurant(renderFunc);
  return inst.process();
});

Promise.all(promises);
