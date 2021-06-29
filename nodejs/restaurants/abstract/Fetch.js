const axios = require('axios');

class Fetch {
  url = null;
  body = null;

  constructor(url) {
    this.url = url;
  }

  async fetch() {
    try {
      const response = await axios.get(this.url);

      this.body = response.data;
    } catch (error) {
      this.body = null;
      console.log(error);
      throw 'something went wrong';
    }
  }

}

module.exports = Fetch;
