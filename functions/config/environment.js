let nodeEnv = process.env.nodeEnv || 'default';

try {
    const functions = require('firebase-functions');
    if(functions.config && functions.config().enviroment?.node_env)
        nodeEnv = functions.config().environment.nodeEnv
} catch (error) {
    console.log("functions.config() no disponible en este entorno, usando NODE_ENV")
}

console.log("nodeEnv: ", nodeEnv);

let environmentFile;
switch (nodeEnv) {
    case "prod":
        environmentFile = '.env';
        break;
    case "dev":
        environmentFile = '.env.dev';
        break;
    case "test":
        environmentFile = '.env.dev';
        break;
    default:
        environmentFile = '.env.dev';
        break;
}

require ("dotenv").config({ path: environmentFile });
