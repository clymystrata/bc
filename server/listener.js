const app = require('./server');

const port = process.env.PORT || (process.argv[2] || 8032);
app.listen(port, () => {
    console.log('listening on port: ' + port);                                             
}); 