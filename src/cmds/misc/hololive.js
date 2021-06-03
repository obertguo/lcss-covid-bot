const axios = require('axios').default;

let zerothGen = [
    {
        name: 'Tokino Sora',
        chanId: 'UCp6993wxpyDPHUpavwDFqgg'
    },
    {
        name: 'Roboco',
        chanId: 'UCDqI2jOz0weumE8s7paEk6g'
    },
    {
        name: 'Sakura Miko',
        chanId: 'UC-hM6YJuNYVAmUWxeIr9FeA'
    },
    {
        name: 'Hoshimachi Suisei',
        chanId: 'UC5CwaMl1eIgY8h02uZw7u8A'
    },
    {
        name: 'AZKi',
        chanId: 'UC0TXe_LYZ4scaW2XMyi5_kw'
    },
];

let firstGen = [
    {
        name: 'Yozora Mel',
        chanId: 'UCD8HOxPs4Xvsm8H0ZxXGiBw'
    },
    {
        name: 'Shirakami Fubuki',
        chanId: 'UCdn5BQ06XqgXoAxIhbqw5Rg'
    },
    {
        name: 'Natsuiro Matsuri',
        chanId: 'UCQ0UDLQCjY0rmuxCDE38FGg'
    },
    {
        name: 'Aki Rosenthal',
        chanId: 'UCLbtM3JZfRTg8v2KGag-RMw'
    },
    {
        name: 'Akai Haato',
        chanId: 'UCHj_mh57PVMXhAUDphUQDFA'
    }
];

let secondGen = [
    {
        name: 'Aqua Minato',
        chanId: 'UC1opHUrw8rvnsadT-iGp7Cg',
    },
    {
        name: 'Murasaki Shion',
        chanId: 'UCXTpFs_3PqI41qX2d9tL2Rw'
    },
    {
        name: 'Nakiri Ayame',
        chanId: 'UC7fk0CB07ly8oSl0aqKkqFg'
    },
    {
        name: 'Yuzuki Choco',
        chanId: 'UC1suqwovbL1kzsoaZgFZLKg'
    },
    {
        name: 'Oozora Subaru',
        chanId: 'UCvzGlP9oQwU--Y0r9id_jnA'
    }
];

let thirdGen = [
    {
        name: 'Usada Pekora',
        chanId: 'UC1DCedRgGHBdm81E1llLhOQ'
    },
    {
        name: 'Uruha Rushia',
        chanId: 'UCl_gCybOJRIgOXw6Qb4qJzQ'
    },
    {
        name: 'Shiranui Flare',
        chanId: 'UCvInZx9h3jC2JzsIzoOebWg'
    },
    {
        name: 'Shirogane Noel',
        chanId: 'UCdyqAaZDKHXg4Ahi7VENThQ'
    },
    {
        name: 'Houshou Marine',
        chanId: 'UCCzUftO8KOVkV4wQG1vkUvg'
    }
];

let fourthGen = [
    {
        name: 'Amane Kanata',
        chanId: 'UCZlDXzGoo7d44bwdNObFacg',
    },
    {
        name: 'Kiryu Coco',
        chanId: 'UCS9uQI-jC3DE0L4IpXyvr6w'
    },
    {
        name: 'Tsunomaki Watame',
        chanId: 'UCqm3BQLlJfvkTsX_hvm0UmA'
    },
    {
        name: 'Tokoyami Towa',
        chanId: 'UC1uv2Oq6kNxgATlCiez59hw'
    },
    {
        name: 'Himemori Luna',
        chanId: 'UCa9Y57gfeY0Zro_noHRVrnw'
    }
];

let fifthGen = [
    {
        name: 'Yukihana Lamy',
        chanId: 'UCFKOVgVbGmX65RxO3EtH3iw'
    },
    {
        name: 'Momosuzu Nene',
        chanId: 'UCAWSyEs_Io8MtpY3m-zqILA'
    },
    {
        name: 'Shishiro Botan',
        chanId: 'UCUKD-uaobj9jiqB-VXt71mA'
    },
    {
        name: 'Omaru Polka',
        chanId: 'UCK9V2B22uJYu3N7eR_BT9QA'
    },
];

let hololiveGamers = [
    {
        name: 'Shirakami Fubuki',
        chanId: 'UCdn5BQ06XqgXoAxIhbqw5Rg'
    },
    {
        name: 'Ookami Mio',
        chanId: 'UCp-5t9SrOQwXMU7iIjQfARg'
    },
    {
        name: 'Nekomata Okayu',
        chanId: 'UCvaTdHTWBGv3MKj3KVqJVCw'
    },
    {
        name: 'Inugami Korone',
        chanId: 'UChAnqc_AY5_I3Px5dig3X1Q'
    },
];


exports.run = async(message, args, client) =>{
    try {
        zerothGen = await getStreamStatusPromise(zerothGen);
        firstGen = await getStreamStatusPromise(firstGen);
        secondGen = await getStreamStatusPromise(secondGen);
        thirdGen = await getStreamStatusPromise(thirdGen);
        fourthGen = await getStreamStatusPromise(fourthGen);
        fifthGen = await getStreamStatusPromise(fifthGen);
        hololiveGamers = await getStreamStatusPromise(hololiveGamers);

        const embed = client.embedBuilder();
        embed.setTitle('Hololive Stream Status');
        embed.description = stringifyData('Zeroth Gen', zerothGen) + stringifyData('First Gen', firstGen) + stringifyData('Second Gen', secondGen) + 
        stringifyData('Third Gen', thirdGen) + stringifyData('Fourth Gen', fourthGen) + stringifyData('Fifth Gen', fifthGen) + stringifyData('Hololive Gamers', hololiveGamers);

        message.channel.send(embed);
        // getStreamStatus().then(res => console.log('test 3' + res));

    }
    catch(err){
        console.log(err);
    }
};

// exports.desc = 'Hololive streaming status';

// const getStreamStatus = () =>{
//     return new Promise(async (resolve, reject) =>{
//         const driver = require('../../utils/driver')();
//         const webdriver = require('selenium-webdriver');

//         const chanId = 'UCZlDXzGoo7d44bwdNObFacg';
//         const baseURL = 'https://www.youtube.com/channel/';
//         const reqLiveStreamStatusURL = baseURL + chanId + '/live';

//         // try{
//             await driver.get(reqLiveStreamStatusURL);
            
//             const viewCount = driver.wait(webdriver.until.elementLocated(webdriver.By.className('view-count'), 1000));
//             viewCount.getText().then(async res =>{
//                 console.log(res);
//                 const livestreamURL = await driver.getCurrentUrl();
//                 console.log(livestreamURL);

//             }).catch(err => reject(err));


            
//             // if(reqLiveStreamStatusURL === livestreamURL) resolve(false);

//             // else{
//             //     const liveStarted = await driver.executeScript(() =>{
//             //         const viewCount = document.getElementsByClassName('view-count')[0].textContent; 
//             //         //See if view count text includes "waiting". If it does, stream has yet to start
//             //         return !viewCount.includes('waiting');
//             //     });
                
//             //     if(liveStarted) resolve(livestreamURL);
//             //     else resolve(false);
//             // }
//         // }
//         // catch(err){
//         //     console.log(err);
//         //     resolve(false);
//         // }
//     });
// }

const getStreamStatusPromise = (members) =>{
    //YT API key https://developers.google.com/youtube/v3/getting-started
    //YT API search docs https://developers.google.com/youtube/v3/docs/search/list 
    //Quota https://developers.google.com/youtube/v3/determine_quota_cost 100 / 10,000
    const apiKey = 'AIzaSyASSI8Qb9zzsP9NPGxgGluceAcgSUsIfvY';
    const baseURL = 'https://www.googleapis.com/youtube/v3/search';

    return new Promise(async (resolve, reject) =>{
        for(i = 0; i < members.length; i++){
            const reqLiveStreamStatusURL = baseURL + `?key=${apiKey}&part=snippet&type=video&eventType=live&channelId=${members[i].chanId}`;
            try{
                const res = await axios.get(reqLiveStreamStatusURL);
                const items = res.data.items;
    
                if(items.length === 0) members[i]['stream'] = false; 
    
                else{
                    const videoId = items[0].id.videoId;
                    const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
    
                    members[i]['stream'] = videoLink;
                }            
            }
            catch(err){
                reject(err);
            }
        };
        resolve(members);
    });
}

const stringifyData = (gen, members) =>{
    let res = `**${gen}**\n`;
    for(i = 0; i < members.length; i++){
        res += `${members[i].stream === false ? '' : '🟢'} ${members[i].name} is ${members[i].stream === false ? 'not' : ''} streaming ${members[i].stream === false ? '' : `[Link to stream](${members[i].stream})`}\n`;
    }
    res += '\n'
    return res;
}



//https://www.googleapis.com/youtube/v3/search?key=AIzaSyASSI8Qb9zzsP9NPGxgGluceAcgSUsIfvY&channelId=UCS9uQI-jC3DE0L4IpXyvr6w&part=snippet&eventType=upcoming&type=video




// {
//     "kind": "youtube#searchListResponse",
//     "etag": "tThn1qm6OYetsQrv4gWkeiV8Wes",
//     "regionCode": "US",
//     "pageInfo": {
//         "totalResults": 1,
//         "resultsPerPage": 1
//     },
//     "items": [{
//         "kind": "youtube#searchResult",
//         "etag": "63uy5YUChAqrpAhsOTOpH7FAC-k",
//         "id": {
//             "kind": "youtube#video",
//             "videoId": "hFh7ww-F624"
//         },
//         "snippet": {
//             "publishedAt": "2021-01-29T16:31:19Z",
//             "channelId": "UCS9uQI-jC3DE0L4IpXyvr6w",
//             "title": "FREE CHAT ふりーちゃっと",
//             "description": "Just a place to chat すきにせぇ.",
//             "thumbnails": {
//                 "default": {
//                     "url": "https://i.ytimg.com/vi/hFh7ww-F624/default_live.jpg",
//                     "width": 120,
//                     "height": 90
//                 },
//                 "medium": {
//                     "url": "https://i.ytimg.com/vi/hFh7ww-F624/mqdefault_live.jpg",
//                     "width": 320,
//                     "height": 180
//                 },
//                 "high": {
//                     "url": "https://i.ytimg.com/vi/hFh7ww-F624/hqdefault_live.jpg",
//                     "width": 480,
//                     "height": 360
//                 }
//             },
//             "channelTitle": "Coco Ch. 桐生ココ",
//             "liveBroadcastContent": "upcoming",
//             "publishTime": "2021-01-29T16:31:19Z"
//         }
//     }]
// }