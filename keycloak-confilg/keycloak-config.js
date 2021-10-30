var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

// Configure session
// app.use(session({
//     secret: 'mySecret',
//     resave: false,
//     saveUninitialized: true,
//     store: memoryStore
//   }));
var keycloakConfig = {
    clientId: 'Finance_Excel',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm: 'Finance_Excel',
    credentials: {
        secret:'7d052dd7-cf40-4609-969e-05da7cf9b4cc'
    },
 

};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};

