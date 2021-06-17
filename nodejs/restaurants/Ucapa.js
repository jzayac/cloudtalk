const Fetch = require('./abstract/Fetch');
const Restaurant = require('../model/Restaurant');
const HTMLParser = require('node-html-parser');

class Ucapa extends Fetch {
  constructor(renderFunc) {
    super('https://www.pivnice-ucapa.cz/denni-menu.php');
    this.name = 'PIVNICE U CAPA';
    this.renderFunc = renderFunc;
  }

  parseToRestaurant() {
    if (this.body === null) {
      console.log('cannot parse null');
    }

    const restaurant = new Restaurant(this.name);
    const root = HTMLParser.parse(this.body);
    const rows = root.querySelectorAll('.row.mb-4');

    rows.map((item) => {
      const row = HTMLParser.parse(item.childNodes);
      const dayName = row.querySelector('.day').text;
      const date = row.querySelector('.date').text;
      const food = row.querySelectorAll('.row');

      const dayOffer = [];

      food.map((item2) => {
        dayOffer.push({ description: item2.text.replace(/\s/g, ' ').trim() });
      });

      restaurant.pushDay(dayName, date, dayOffer);
    });

    return restaurant;
  }

  async process() {
    await this.fetch();
    const restaurant = this.parseToRestaurant();
    this.renderFunc(restaurant);
  }
}

module.exports = Ucapa;
