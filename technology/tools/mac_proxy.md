# Mac 代理

# 浏览器代理

使用 switchomega

# 桌面应用代理(含终端)

1. clashx中添加要访问的url代理规则，或者直接选择全局代理
2. 终端中 输入

```shell
export https_proxy=http://127.0.0.1:7890;
export http_proxy=http://127.0.0.1:7890;
export all_proxy=socks5://127.0.0.1:7890
```
此代理只在当前终端生效，关闭后重置
3. 桌面应用中可以在具体的应用设置里找看是否有代理的设置

# Tip

Q: 如何确定当时是否已正确切换代理了？

A: 终端中输入 `curl ipc.cc` 可查看当前自己的ip是否已是代理（ipc.cc也要先添加进代理规则）

Q: 已经正确显示代理地址，但还是ping不通google.com？

A: clashx代理是基于tcp或者udp协议，而ping是走的icmp协议因此在clash下不能ping通google
