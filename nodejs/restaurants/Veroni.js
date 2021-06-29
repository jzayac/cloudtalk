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

curl 'https://www.menicka.cz/4921-veroni-coffee--chocolate.html'   -H 'Connection: keep-alive'   -H 'Pragma: no-cache'   -H 'Cache-Control: no-cache'   -H 'sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"'   -H 'sec-ch-ua-mobile: ?0'   -H 'Upgrade-Insecure-Requests: 1'   -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36'   -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'   -H 'Sec-Fetch-Site: none'   -H 'Sec-Fetch-Mode: navigate'   -H 'Sec-Fetch-User: ?1'   -H 'Sec-Fetch-Dest: document'   -H 'Accept-Language: en-US,en;q=0.9'   -H 'Cookie: msession=0h3gm87pcu4v5h4ikh7r2u9pg7; column=two; __utmz=12950315.1623487901.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _ga=GA1.2.1145953898.1623487901; _pbjs_userid_consent_data=3524755945110770; __gads=ID=33a41da9160e0e89:T=1623487904:S=ALNI_MZj1qvNKV7cgtJT84N2YApJltrNHg; PHPSESSID=mhi665rrcn5g3pfj4goqs37rc5; profileview=4921%2C4921%2C4921%2C4921; __utma=12950315.1145953898.1623487901.1623670505.1624360682.4; __utmc=12950315; __utmb=12950315.2.9.1624360682; _gid=GA1.2.1250215647.1624360683'   --compressed
