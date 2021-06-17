const axios = require('axios');
// const iconv  = require('iconv').Iconv;
// const iconv  = require('iconv');

class Fetch {
  url = null;
  body = null;

  constructor(url) {
    this.url = url;
  }

  // async fetch() {
  //   try {
  //     // const instance = axios.create({
  //     //   baseURL: this.url,
  //     //   // timeout: 1000,
  //     //   headers: {'Content-type': 'application/json; charset=utf-8'}
  //     // });
  //     // const response = await instance.get();
  //     const response = await axios.get(this.url, { responseType: 'arraybuffer' });
  //     const ctype = response.headers["content-type"];
  //     let data;

  //     if (ctype.includes("charset=GB2312"))
  //         data = iconv.decode(response.data, 'gb2312');
  //     else
  //         data = iconv.decode(response.data, 'utf-8');
  //     this.body = response.data;
  //   } catch (error) {
  //     this.body = null;
  //     console.log(error);
  //     throw 'something went wrong';
  //   }
  // }

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
