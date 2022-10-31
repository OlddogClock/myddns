const needle = require('needle')

// 获取出口IPv6的网络服务
const getIPv6Api = [
  'https://v6r.ipip.net/',
  'https://ipv6.icanhazip.com/',
  'https://ip6only.me/api/',
  'https://v6.ip.zxinc.org/info.php?type=json',
  'https://ipv6out.ipqi.co/?callback=cb',
  'https://ip.gs/ip',
  'https://www.cz88.net/api/cz88/ip/base?ip=',
]

// 获取IPv6地址的正则
const reg = /\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*/ig

// 模拟浏览器UA访问api
needle.defaults({
  user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.24',
})

exports.getMyIP = async({log})=>{
  let IPv6
  // 循环访问API，只要有一个返回就break
  for(let i=0;i<getIPv6Api.length;i++){
    const response = await needle('get', getIPv6Api[i])
    try {
      if(response.statusCode == 200){
        let ipv6match = ''
        // 有的API返回的是JSON格式
        if(response.parser==='json'){
          ipv6match = JSON.stringify(response.body).match(reg)
        }else{
          ipv6match = response.body.match(reg)
        }
        if(ipv6match){
          // 命中IPv6正则，返回
          IPv6 = ipv6match[0]
          break
        }
      }
    }catch(e){
      log.error(e.message)
    }
  }
  if(!IPv6){
    log.error(`All API Unavailable`)
    return false
  }
  return IPv6
}
