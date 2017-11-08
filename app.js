var http = require('http')
var exec = require('child_process').exec;
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'lj19881010' });
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  });
}).listen(7778);
handler.on('error', function (err) {
  console.error('Error:', err.message);
});
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
    exec('/root/node.js/auto-deploy-vn/sync.sh', function(err, stdout, stderr){
    if(err) {
      console.log('sync server err: ' + stderr);
    } else {
      console.log(stdout);
    }
  });
});



