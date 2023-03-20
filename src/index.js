require('dotenv').config();
const requestIp = require('request-ip');


const app = require('./app')
require('./database');

async function main(){
    await app.listen(app.get('port'),app.get('host'));
    const clientIp = requestIp.getClientIp(req);

    console.log({clientIp});
    console.log('Server on port ', app.get('port'));
    console.log('Server on host ', app.get('host'))
}

main();
