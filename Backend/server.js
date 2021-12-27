"use strict";

require('dotenv').config()
const Hapi = require('@hapi/hapi')
const { routes } = require('./routes')
const server = Hapi.server({
    port: 3030,
    host: 'localhost'
})
const init = async () => {
    server.realm.modifiers.route.prefix = process.env.API_PREFIX;
    await server.route(routes);
    await server.register({
            plugin: require('hapi-cors'),
            options: {
                origins: ['*'],
                allowCredentials: 'true',
                exposeHeaders: ['content-type', 'content-length'],
                maxAge: 600,
                methods: ['POST, GET, OPTIONS, PATCH, DELETE',],
                headers: ['Accept', 'Content-Type', 'Authorization']
            }
        })
    await server.start();
    return server;
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init().then(server => {
    console.log('server running')
}).catch(err => {
    console.log(err)
    process.exit(1)
})