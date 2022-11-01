const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');


const argv = yargs(hideBin(process.argv))
    .option('filePath', {
        alias: 'fp',
        type: 'sring',
        description: 'имя файла для анализа результатов',
        default: 'party_log.txt'
    })
    .argv;

console.log('Файл лога:', argv.filePath);

const readerStream = fs.createReadStream(argv.filePath);

var countGame = 0;

var data = fs.readFileSync(argv.filePath);
var dataArr = data.toString('utf8').split('\n');

var winCount = 0;

dataArr.forEach(function (elem) {
    if (elem != '') {
        let game = JSON.parse(elem);
        if (game.resGame == 1) {
            winCount += 1;
        }      
    }
});

console.log('Всего игр:', dataArr.length);
console.log('Выигранных :', winCount, 'Проигранных:', dataArr.length - winCount);
console.log('процентное соотношение выигранных партий:', Math.round(winCount / dataArr.length * 100), '%');



