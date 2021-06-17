class Restaurant {
  title = '';
  days = [];

  constructor(title) {
    this.title = title;
  }

  pushDay(dayName, date, offer) {
    this.days.push({
      name: dayName,
      date,
      offer,
    });
  }
}

module.exports = Restaurant;
