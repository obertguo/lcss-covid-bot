const https = require('http');
const http = require('https');

const options = {
    hostname: 'cbcliveradio-lh.akamaihd.net',
    path: '/i/CBCR1_LDN@48520/index_48_a-p.m3u8'
}

const getStreamLinkPromise = () =>{
    return new Promise((resolve, reject) =>{
        http.get(options, res =>{
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => {
                data = data.split('\n');
                resolve(data[6]);
            });
            res.on('error', err => reject(err));
        });
    });
}

module.exports = getStreamLinkPromise;

