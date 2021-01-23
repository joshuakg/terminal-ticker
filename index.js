const ora = require('ora');

const { formatTickers, combineInfo, getFormattedTicker, getFormattedPrice } = require('./src/formatters');
const { getStockInfo, getTerminalWidth, validateAndAddTicker, removeTickersFromList, clear, getTickers } = require('./src/utils');
const { mainMenu, tickerMenu, selectStocksToRemove, getStockTicker, confirmRemovalPrompt } = require('./src/prompt');
const { QUESTIONS } = require('./src/constants');

const Carousel = require('./src/carousel');
const carousel = new Carousel();

let interval;

const _refreshData = async () => {
  let tickers = getTickers();
  let info = await getStockInfo(tickers);
  let prettyTickers = await Promise.all(info.map(val => getFormattedTicker(val.displayName)));
  let prettyPrices = await Promise.all(info.map(val => getFormattedPrice(val.regularMarketChangePercent.toFixed(2))));

  let combinedPretty = prettyTickers.map((val, index) => combineInfo(val, prettyPrices[index]));

  carousel.data = formatTickers(combinedPretty);
};

const _startTicker = () => {
  _refreshData();

  interval = setInterval(() => {
    _refreshData();
  }, 30000);

  carousel.start();
};

const _stopTicker = () => {
  clearInterval(interval);
  clear();
  main();
};

const _tickerMenu = async () => {
  let { watchlist } = await tickerMenu();

  if (watchlist === QUESTIONS.REMOVE_STOCKS) {
    let { stocksToRemove } = await selectStocksToRemove();
    if (!!stocksToRemove.length) {
      let { confirmRemoval } = await confirmRemovalPrompt(stocksToRemove);
      if (confirmRemoval) removeTickersFromList(stocksToRemove);
    }
  };

  if (watchlist === QUESTIONS.ADD_STOCKS) {
    let { newTicker } = await getStockTicker();
    await validateAndAddTicker(newTicker);
  };

  if (watchlist === QUESTIONS.BACK) return main();

  _tickerMenu();
};

const main = async () => {
  try {
    clear();
    getTickers();
    let { menu } = await mainMenu();

    if (menu === QUESTIONS.START_TICKER) _startTicker();
    if (menu === QUESTIONS.UPDATE_WATCHLIST) _tickerMenu();
  } catch (e)  {
    console.error(e);
  }
};

main();
