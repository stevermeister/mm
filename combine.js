// let museums = [];
// for(let i = 0; i <14; i++ ){
//    museums = museums.concat(require(`./museums3_${i*50+1}_${(i+1)*50}.json`));
// }

// console.log(museums.length);



const museums = require('./museums4.json');

console.log(museums[0]);

museums.map(museum => {
    museum.coordinates = getGeo(museum.link);
});

console.log(museums);

const fs = require('fs');
fs.writeFile('./museums5.json', JSON.stringify(museums), function(
  err
) {
  if (err) {
    return console.log(err);
  }

  console.log('The file was saved!');
});




function getGeo(link) {
    const url = require('url');
    const params = new URLSearchParams(url.parse(link).search);
    return params.get('q').split('@')[1].split(',');
}