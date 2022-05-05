# 智能合约


## 合约类型

> 合约的限制应该越少越好，方便后续的扩展
- EIP-1155
- ERC-721
- 多重合约 （如hape/cloneX）

分配方式和token分开各自为一个合约，好处是把这两类逻辑进行解耦，比如发售时发现bug，但已经mint了1000个，可以直接把分配方式的合约换了，token合约不受影响，因为一般来说分配方式的合约中会有一个setAdmin类似的函数用来set token合约的地址。

## 合约结构

- 分配方式 
白单如何确定，如何分发 

- Mint手段
前置条件

- 其他
比较奇怪的合约，往往是漏洞发生的地方

## 工具

- deth.net etherscan网址后缀改成这个即可在vscode里进行阅读
- tenderly 可以直观的分析tx,比如gas消耗，每步的细节等，还可以进行合约方法的监听提醒推送

## 合约部署

- remix 直观方便的部署简单合约，不要把remix当成一个ide工具，而是当成一个部署工具
 
- hardhat 本地开发部署复杂合约

## 快速发现部署的合约
[blocknative](https://explorer.blocknative.com/)
可以第一时间发现感兴趣的项目合约，就可以第一时间研究介入

- 主网监测

- 测试网监测

mint和token合约分开，通过一个合约嵌套另一个合约的形式 

## 代码分析

### 审计分析
- Reentrancy
    1. Safemint or nft transfer 必须是函数的最后一步
    2. If there is a reentrary guard.

- Ownership
    1. ownerble , 判断函数权限

- Timestamp dependency
    1. Timestamp attack
      规定开售时间，一般只能被矿工攻击，提前上块
       
- Dos with Throw 

    一般存在于合约需要和mint的人有交互的场景，如退款等
    1. refund ， 因为退款需要保证收到退款的人需要有接收的方法

- Contract interact
    合约和合约交互
    
    1. 如何判断是否可以合约交互？
       
       合约中搜索origin， 如有则不行，逻辑是tx.origin!=msg.sender,即tx的发起者要和起时者一样
       具体要结合合约代码去看，一般是一个modifier限制了权限

### 业务逻辑分析 

1. start from **require**(revert)

    检查条件是否和白单规则一样，比如一人可以mint几个，供应量等

2. whitelist

    - signature/merkleproof 

    默克尔树，注意有这个proof不一定就是安全的，要检查的是**解码proof的时候是否有把用户的地址当做编码的一部分**从而保证每笔tx都是独一无二的

    - amount gap

    每个账号可以mint的数量
    如IO（imaginary ones）中是用一个数组来记录当前用户地址mint了多少个，有些老的合约是用msg.balanceOf来判断，这个就可以在mint一个之后把nft转走，然后就可以接着mint

    - withdraw

     看能否卡住withdraw的流程可以索取利益

### 反编译

1. 未开源意味着什么

    a. 项目方有问题
     
      如果项目方发布的合约只有一个文件，基本可以确定项目方技术实力不怎么样
    b. remix 部署合约技术比较低，业界普遍的做法是hardhat, verify后合约是多个文件

2. 反编译技巧
## 合约开发

- Hardhat 


    a. payable 关键字
    b. token id 自增
    c. revert条件 （require/revert 反编译后都会变成revert）
    d. balanceOf








## 易混概念

- 合约是用solidity 编写，一种智能合约**语言** 和js没有关系，所以语法上不要混淆

- 用户mint过程为

    1. 用户浏览器打开项目app页面
    2. app页面里使用前端技术和钱包+合约交互
    3. **登录授权等属于钱包的接口，mint属于合约的接口** ethers.js是前端和合约交互的库

- 合约编译发布后不可更改，所以只能重新发布，每次发布都生成一个新的合约地址

- ABI文件是合约编译后的接口文档，交互和调用都是使用ABI

- 更新合约代码后需要做以下2件事

    1. 重新deploy
    2. 更新合约地址
    3. 更新合约abi

    可以帮助开发者管理重复性任务的一个框架，同时带有一个本地EVM，可以理解为一个local的server只不过这个server是个区块链

