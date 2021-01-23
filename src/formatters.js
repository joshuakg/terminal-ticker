const figlet = require('figlet');

const getFormattedTicker = async displayName => {
  let resolver;
  let resolved = new Promise(resolve => (resolver = resolve));
  let formattedTicker;

  figlet.text(displayName, {
    font: 'Roman',
    horizontalLayout: 'full',
    verticalLayout: 'default',
    whitespaceBreak: true
  }, (err, data) => {
    if (err) return console.error(err);
    formattedTicker = data;
    resolver();
  });

  await resolved;
  return formattedTicker;
};

const getFormattedPrice = async price => {
  let resolver;
  let resolved = new Promise(resolve => (resolver = resolve));

  let formattedPrice
  if (!price.includes('-')) price = ` +${price}`;
  else price = price.replace('-', ' -');

  price = `${price}% \t \t \t`

  figlet.text(price, {
    font: 'Roman',
    horizontalLayout: 'full',
    verticalLayout: 'default',
    whitespaceBreak: true
  }, (err, data) => {
    if (err) return console.error(err);
    formattedPrice = data;
    resolver();
  });

  await resolved;
  if (price.includes('-')) return formattedPrice
  return formattedPrice;
};

const formatTickers = tickers => {  
  let combined = tickers[0];
  tickers.forEach((val, index) => {
    if (!index) return;
    combined = combineInfo(combined, val);
  });

  return combined;
};

const combineInfo = (ticker, change) => {
  let splitTicker = ticker.split('\n');
  let splitChange = change.split('\n');

  let test = splitTicker.map((tickerRow, index) =>  {
    return [...tickerRow, ...splitChange[index]].join("");
  });

  return test.join('\n');
};


module.exports = { formatTickers, combineInfo, getFormattedPrice, getFormattedTicker };
