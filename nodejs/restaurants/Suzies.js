const Fetch = require('./abstract/Fetch');
const Restaurant = require('../model/Restaurant');
const HTMLParser = require('node-html-parser');

class Suzies extends Fetch {
  constructor(renderFunc) {
    super('http://www.suzies.cz/poledni-menu.html');
    this.name = 'SUZIES STEAK PUB';
    this.renderFunc = renderFunc;
  }

  parseToRestaurant() {
    if (this.body === null) {
      console.log('cannot parse null');
    }

    const restaurant = new Restaurant(this.name);
    const root = HTMLParser.parse(this.body);
    const rows = root.querySelectorAll('#weekly-menu .day');

    rows.map((item) => {
      const row = HTMLParser.parse(item.childNodes);
      const title = row.querySelector('h4').text;
      const [dayName, date] = title.split(' ');

      const food = row.querySelectorAll('.item');

      const dayOffer = [];

      food.map((item2) => {
        const row2 = HTMLParser.parse(item2.childNodes);

        let descriptionElement = row2.querySelector('.title');

        if (!descriptionElement) {
          descriptionElement = row2.querySelector('.text');
        }

        let description =
          (descriptionElement && descriptionElement.text) || '';

        description = description.replace(/\s/g, ' ').trim()

        if (description.length > 50) {
          description = description.substring(0, 49) + "...";
        }

        const priceElement = row2.querySelector('.price');
        const price = (priceElement && priceElement.text) || '';
        dayOffer.push({
          description:
            description.replace(/\s/g, ' ').trim() + '  ' + price.trim() + " Kc",
        });
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

module.exports = Suzies;
