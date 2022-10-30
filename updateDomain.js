
const {default: Client, DescribeDomainRecordsRequest, UpdateDomainRecordRequest} = require('@alicloud/alidns20150109')
const { Config } = require('@alicloud/openapi-client')
const {default: Util, RuntimeOptions} = require('@alicloud/tea-util')

exports.updateDomain = async ({IPv6,accessKeyId,accessKeySecret,RRKeyWord,domainName,log})=>{
  if(!IPv6){
    return false
  }

  const config = new Config({
    accessKeyId,accessKeySecret
  })
  config.endpoint = 'dns.aliyuncs.com'
  const client = new Client(config)

  const runtime = new RuntimeOptions({})

  const getRecordsRequest = new DescribeDomainRecordsRequest({
    domainName,
    RRKeyWord,
  })

  const domainRecords = await client.describeDomainRecordsWithOptions(getRecordsRequest, runtime)
  const domainConfig= domainRecords.body.domainRecords.record[0]
  // 现有记录与当前IP相同时不更新
  if(domainConfig.value === IPv6){
    log.info(`当前域名${RRKeyWord}.${domainName}解析无变化，仍然是${domainConfig.value}`)
    return false
  }

  // 更新域名解析
  const recordId = domainConfig.recordId

  const setRecordRequest = new UpdateDomainRecordRequest({
    recordId: recordId,
    RR:RRKeyWord,
    type: 'AAAA',
    value: IPv6,
  })

  try{
    const a = await client.updateDomainRecordWithOptions(setRecordRequest, runtime)
    log.info(`SUCCESS ${new Date(a.headers.date).toLocaleString()}`)
  }catch(e){
    log.error(e.message)
  }
  
}