const {exec} = require('child_process');

const combine = (f1, f2, f3) =>{
    exec(`ffmpeg -i "concat:${f1}|${f2}|${f3}" -acodec copy output.ts & shutdown`, (err, stdout, stderr) =>{
        if(err) return reject(err);
        if(stderr) return reject(stderr);
    });
}
module.exports = combine;