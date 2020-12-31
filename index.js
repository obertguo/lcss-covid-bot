const update = require('./utils/update');

// require('./bot');
update().then(() => {
    require('./bot');
}).catch(err =>{
    console.error(err);
});