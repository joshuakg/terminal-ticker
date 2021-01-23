const si = require('stock-info');

const getStockInfo = tickers => si.getStocksInfo(tickers);
const getTerminalWidth = () => process.stdout.columns;

module.exports = { getStockInfo, getTerminalWidth };


