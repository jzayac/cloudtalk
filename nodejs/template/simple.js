const chalk = require('chalk');

const render = (restaurant) => {
  if (restaurant === null) {
    console.log('cannot render null');
  }

  console.log(chalk.blue(restaurant.title));

  restaurant.days.map(day => {
    console.log(chalk.green(`\t${day.name}`));
    day.offer.map(offer => {
      console.log(`\t\t${offer.description}`)
    })
  })
};

module.exports = render;
