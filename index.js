'use strict';

exports.handler = (event, context, callback) => {
    let request = event.Records[0].cf.request;
    if (request.uri === "/index.html") {
        const response = {
            status: '302',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: "/",
                }],
            },
        };
        callback(null, response);
    }
    
    if (request.uri.endsWith("/index.html")) {
        const response = {
            status: '302',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: request.uri.substr(0, (request.uri.length - 11)),
                }],
            },
        };
        callback(null, response);
    }
    
    if (request.uri.endsWith("/") && request.uri !== "/") {
        const response = {
            status: '302',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: request.uri.substr(0, (request.uri.length - 1)),
                }],
            },
        };
        callback(null, response);
    }
    
    callback(null, request);
};
