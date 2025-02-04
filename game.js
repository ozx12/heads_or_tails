const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const argv = yargs(hideBin(process.argv))
  .option('filePath', {
    alias: 'fp',
    type: 'sring',
    description: 'имя файла для логирования результатов партии',
    default: 'party_log.txt'
  })
  .argv;

const file = path.join(__dirname, argv.filePath);

console.log('Файл для записи лога:', argv.filePath);
console.log('Для завершения игры введите любые значения кроме  1 и 2');

function randInt() {
  let rand = 1 + Math.random();
  return String(Math.round(rand));
};
 
function content(coin, line, resGame) {
  let lineOut = {
    coin: coin,
    enter: line,
    resGame: resGame
  };  
  return ('\n' + JSON.stringify(lineOut) );
}

function questMe() {
  var coin = randInt();
  console.log('Угадайте число 1 или 2?');
  rl.on('line', line => {
    if ((line != '1') && (line != '2')) {
      console.log("Вы не ввели 1 или 2!");
      rl.close();
    };

    if (coin == line) {
      console.log("Правильно!");
      fs.appendFile(file, content(coin, line, true), (err) => {
        if (err) throw (err);
      });
    };

    if (coin != line) {
      console.log("Не Правильно!");
      fs.appendFile(file, content(coin, line, false), (err) => {
        if (err) throw (err);
      });
    };

    coin = randInt();
    console.log('Угадайте число 1 или 2?');
  });

  rl.on('close', () => {
    console.log('Конец игры');
    process.exit(0);
  });
};


questMe();


