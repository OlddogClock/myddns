const key = require('./key.json')
const { getMyIP } = require('./getMyIPv6')
const { updateDomain } = require('./updateAliyunDNS')
const { CronJob } = require('cron')
const { EventLogger } = require('node-windows')
const log = new EventLogger(key.ServiceName)

let ip
new CronJob(
  key.Cron || "* * * * *",
  async() => {
    let _ip = await getMyIP({ log })
    if (ip !== _ip) {
      log.info(`IP地址由 ${ip} 变为 ${_ip} ，开始更新DNS`)
      await updateDomain({
        IPv6: _ip,
        ...key.Aliyun,
        log,
      })
      ip = _ip
    }
  },
  null,
  true,
  'Asia/Shanghai',
)

