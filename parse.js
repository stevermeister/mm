const testlink = 'http://maps.google.nl/maps?q=Locatie%C2%A0van%C2%A0ASSEN%4052.9933334,6.5639782&hl=nl&ie=UTF8&t=m&om=1&z=12';


function getGeo(link) {
    const url = require('url');
    const params = new URLSearchParams(url.parse(link).search);
    return params.get('q').split('@')[1].split(',');
}

getGeo(testlink);



