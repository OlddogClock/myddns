const {Service} = require('node-windows');
const {ServiceName} = require('./key.json')

const svc = new Service({
  name:ServiceName || 'MyDDNS',
  script: require('path').join(__dirname,'app.js'),
  //, allowServiceLogon: true 
});

svc.on('install',function(){
  svc.start();
  console.log('service installed')
});

svc.install()