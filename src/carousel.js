const { getTerminalWidth } = require('./utils');
class Carousel {
  constructor() {
    this.data = '';
    this.localData = '';
  };

  start() {
    let count = 0;

    setInterval(() =>  {
      if(!this.localData) this.localData = this.data;
      let charWidth = getTerminalWidth();
      let splitRows = this.localData.split('\n');
      let shouldScroll = true;

      let columns = splitRows[0].length;

      splitRows.forEach(row => {
        if (row.length  > columns) columns = row.length;
      });

      if (columns <= charWidth) shouldScroll = false;

      splitRows = splitRows.map(row => {
        if (row.length <= charWidth) return row;
        return row + row.substring(0, charWidth);
      });

      let substrings = [];
      splitRows.forEach((row, index) => {
        if (!shouldScroll) return substrings[index] = row;
        substrings[index] = row.substring(count, charWidth + count);
      });

      console.clear();
      console.log(substrings.join('\n'));

      if (columns === count) {
        this.localData = this.data;
        count = 0;
      };
      count++;
    }, 100);
  };
}

module.exports = Carousel;
