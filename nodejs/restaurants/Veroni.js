const Fetch = require('./abstract/Fetch');
const Restaurant = require('../model/Restaurant');
const HTMLParser = require('node-html-parser');

class Veroni extends Fetch {
  constructor(renderFunc) {
    super('https://www.menicka.cz/4921-veroni-coffee--chocolate.html');
    this.name = 'VERONI CAFE';
    this.renderFunc = renderFunc;
  }

  parseToRestaurant() {
    if (this.body === null) {
      console.log('cannot parse null');
    }

    const restaurant = new Restaurant(this.name);
    const root = HTMLParser.parse(this.body);
    const rows = root.querySelectorAll('.menicka');

    const today = rows[0];
    const row = HTMLParser.parse(today.childNodes);
    const title = row.querySelector('.nadpis').text;
    const [dayName, date] = title.split(' ');
    const food = row.querySelectorAll('li');

    const dayOffer = [];

    food.map((item2) => {
      dayOffer.push({ description: item2.text.replace(/\s/g, ' ').trim() });
    });

    restaurant.pushDay(dayName, date, dayOffer);

    return restaurant;
  }

  async process() {
    await this.fetch();
    const restaurant = this.parseToRestaurant();
    this.renderFunc(restaurant);
  }
}

module.exports = Veroni;
