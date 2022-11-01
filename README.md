## Dynamic DNS for IPv6
基于IPv6和阿里云的动态域名服务，使用Nodejs实现，以Windows服务形式运行，目前仅支持Windows，但依赖的包都具有跨平台基础，可以自行修改运行在其它操作系统上。

### 使用方法
* 注册一个阿里云域名，任何后缀都可以，比如`example.com`，不对外提供服务的话，无需ICP备案
* 进入阿里云控制台域名解析，新建一个二级域名如`ipv6`，`AAAA记录`暂时填写`::1`（注意：IPv6的解析设置是AAAA记录，不是A记录），确定保存，这样就获得了一个自己的`ipv6.example.com`域名
* 在命令行里`nslookup ipv6.example.com`或者`ping ipv6.example.com`可以看到域名是否生效
* 在阿里云“RAM 访问控制”里获取accessKey，并填写至`key.json.yours`
* 将`key.json.yours`改名为`key.json`，执行`node app/install`，服务安装成功。**项目路径不能改变，否则会出错**
* `Win`+`R`快捷键调出“运行”，输入`services.msc`，可以看到名为`MyDDNS`的服务
* `Win`+`R`快捷键调出“运行”，输入`eventvwr`，Windows日志->应用程序 可以看到来源是`MyDDNS`情况的日志
* 执行`node app/uninstall`，卸载服务
