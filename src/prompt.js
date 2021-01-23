const inquirer = require('inquirer');
const { QUESTIONS } = require('./constants');
const { getTickers } = require('./utils');


//inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const mainMenu = () => (
  inquirer.prompt([
    {
      type: 'list',
      message: 'Terminal Ticker',
      name: 'menu',
      choices: [{ name: QUESTIONS.START_TICKER }, { name: QUESTIONS.UPDATE_WATCHLIST }]
    }
  ])
);

const tickerMenu = () => (
  inquirer.prompt([
    {
      type: 'list',
      message: 'Edit Watchlist',
      name: 'watchlist',
      choices: [{ name: QUESTIONS.ADD_STOCKS }, { name:  QUESTIONS.REMOVE_STOCKS }, { name: QUESTIONS.BACK }]
    }
  ])
);

const selectStocksToRemove = () => {
  const tickers = getTickers(); 
  return inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Select Stocks to Remove',
      name: 'stocksToRemove',
      choices: tickers.map(ticker => ({ name: ticker }))
    }
  ])
};

const confirmRemovalPrompt = tickers => (
  inquirer.prompt([
    {
      name: 'confirmRemoval',
      type: 'confirm',
      message: `Are you sure you want to remove ${tickers.join(', ')}`
    }
  ])
);

const getStockTicker = () => (
  inquirer.prompt([
    {
      type: 'input',
      name: 'newTicker',
      message: 'Type Desired Ticker',
      transformer: val => val.toUpperCase()
    }
  ])
);

module.exports = { mainMenu, tickerMenu, selectStocksToRemove, getStockTicker, confirmRemovalPrompt };
