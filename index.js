const liveServer = require('live-server');
 
var params = {
    port: 8080, 
    host: "0.0.0.0", 
    root: ".", 
    open: false, 
    file: "index.html", 
    wait: 1000, 
    logLevel: 2, 
    middleware: [function(req, res, next) { next(); }] 
};
liveServer.start(params);