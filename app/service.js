const {
  Service,
} = require('node-windows')
const {
  ServiceName,
} = require('./key.json')

const svc = new Service({
  name: ServiceName || 'MyDDNS',
  script: require('path').join(__dirname, 'app.js'),
})

svc.on('install', () => {
  svc.start()
  console.log('service installed')
})

svc.on('uninstall', () => {
  svc.start()
  console.log('service uninstalled')
})

exports.Service = svc