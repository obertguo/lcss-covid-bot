const { exec } = require('child_process');
const fs = require('fs');
const http = require('https');
const { stdout, stderr } = require('process');

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

// const getStreamLinkPromise = () =>{
//     return new Promise((resolve, reject) =>{
//         http.get(options, res =>{
//             let data = '';
//             res.on('data', d => data += d);
//             res.on('end', () => {
//                 data = data.split('\n');
//                 resolve([data[6], data[8], data[10]]);
//             });
//             res.on('error', err => reject(err));
//         });
//     });
// }

// const convertHTTPStoHTTP = (url) => {
//     let link = '';
//     link += url.substring(0, url.indexOf('s'));
//     link+= url.substring(url.indexOf('s') + 1);
//     return link;
// }

// const downloadAudioFile = (url, name) =>{
//     return new Promise((resolve, reject) =>{
//         const fileName = './' + name + '.ts';
        
//         if(fs.existsSync(fileName)) fs.unlinkSync(fileName);

//         let file = fs.createWriteStream(fileName);
//         http.get(url, res =>{
//             res.pipe(file);
//             file.on('finish', ()=>{
//                 file.close();
//             })
//             resolve(fileName);
//         });
//     });
// };

// const retrieveOutputFile = () =>{
//     return new Promise((resolve, reject) =>{
//         getStreamLinkPromise().then(async res =>{
//             const f1 = await downloadAudioFile(res[0], '1');
//             const f2 = await downloadAudioFile(res[1], '2');
//             const f3 = await downloadAudioFile(res[2], '3');

//             if(fs.existsSync('output.ts')) fs.unlinkSync('output.ts');
        
//             let process = exec(`ffmpeg -i "concat:${f1}|${f2}|${f3}" -acodec copy output.ts`, (err, stdout, stderr) =>{
//                 if(err) return reject(err);
//                 if(stderr) return reject(stderr);
//                 console.log(stdout);
//             });
            
//             resolve();
//         });
//     });
// }


module.exports = getStreamLinkPromise;