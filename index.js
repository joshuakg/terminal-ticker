const config = require('config');

const { formatTickers, combineInfo, getFormattedTicker, getFormattedPrice } = require('./src/formatters');
const { getStockInfo, getTerminalWidth } = require('./src/utils');

const Carousel = require('./src/carousel');
let carousel = new Carousel();

let tickers = config.get('tickers');

const _refreshData = async () => {
  let info = await getStockInfo(tickers);
//  console.log(info);
  let prettyTickers = await Promise.all(info.map(val => getFormattedTicker(val.displayName)));
  let prettyPrices = await Promise.all(info.map(val => getFormattedPrice(val.regularMarketChangePercent.toFixed(2))));

  let combinedPretty = prettyTickers.map((val, index) => combineInfo(val, prettyPrices[index]));

  carousel.data = formatTickers(combinedPretty);
};

const main = async () => {
  try {
    _refreshData();

    setInterval(() => {
      _refreshData();
    }, 30000);

    carousel.start();
  } catch (e)  {
    console.error(e);
  }
};

main();
