const update = require('./utils/update');

update().then(() => {
    require('./bot');
}).catch(err =>{
    console.error(err);
})