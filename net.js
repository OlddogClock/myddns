#!/usr/bin/node
const key = require('./key.json')
const {getMyIP} = require('./getMyIPv6')
const {updateDomain} = require('./updateDomain')
const {CronJob} = require('cron')
const {EventLogger} = require('node-windows')
const log = new EventLogger(key.ServiceName)

let ip
new CronJob(
	key.Cron || "* * * * *",
	async()=>{
		let _ip = await getMyIP({log})
    if(ip !== _ip){
      await updateDomain({
        IPv6: _ip,
        ...key.Aliyun,
        log
      })
      ip = _ip
    }
	},
	null,
	true,
	'Asia/Shanghai'
)

