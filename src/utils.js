const si = require('stock-info');
const chalk = require('chalk');
const fs = require('fs');

const { clear } = console;

const getTickers = () => {
  let { tickers } = JSON.parse(fs.readFileSync(`${__dirname}/config.json`, 'utf8'));
  return tickers;
}

const getStockInfo = tickers => si.getStocksInfo(tickers);
const getTerminalWidth = () => process.stdout.columns;

const _getSingleStockInfo = ticker => si.getSingleStockInfo(ticker);

const validateAndAddTicker = async ticker => {
  try {
    ticker = ticker.toUpperCase();
    await _getSingleStockInfo(ticker);
    addStockToList(ticker);
    clear();
  } catch (e) {
    clear();
    console.log(e);
    console.log(chalk.red('Invalid Stock Ticker'));
  }
};

const addStockToList = ticker => {
  let list = getTickers();
  let data = {
    tickers: [...list, ticker]
  };

  fs.writeFileSync(`${__dirname}/config.json`, JSON.stringify(data), e => console.warn(e));
};

const removeTickersFromList = tickers => {
  let filteredList = getTickers().filter(val => !tickers.includes(val));
  let data = {
    tickers: filteredList
  };

  fs.writeFileSync(`${__dirname}/config.json`, JSON.stringify(data), e => console.warn(e));
};

module.exports = { getTickers, getStockInfo, getTerminalWidth, validateAndAddTicker, removeTickersFromList, clear };


