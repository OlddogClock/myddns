## Dynamic DNS for IPv6
基于IPv6的动态域名服务，使用Nodejs实现，以Windows服务形式运行，目前仅支持Windows，但依赖的包都具有跨平台基础，可以自行修改运行在其它操作系统上。

### 使用方法（草稿）
* 注册一个阿里云域名，任何后缀都可以，比如`example.com`，不对外提供服务的话，无需ICP备案
* 进入阿里云控制台域名解析，新建一个二级域名如`ipv6`，`A记录`暂时填写`127.0.0.1`，确定保存，这样就获得了一个自己的`ipv6.example.com`域名，在命令行里`nslookup ipv6.example.com`或者`ping ipv6.example.com`可以看到域名是否生效
* 根据阿里云帮助，获得阿里云accessKey，填写至`key.json.yours`
* 将`key.json.yours`改名为`key.json`

