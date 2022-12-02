# Solidity

**合约**理解为编程语言中的**类** 

每个合约中可以包含 状态变量、 函数 , 事件 Event, 错误(Errors), 结构体 和 枚举类型 的声明，且合约可以从其他合约继承

## 合约结构

- 函数

    1. helper 函数写在合约外部

- modifier

    1. 相当于约束

    ```
    pragma solidity >=0.4.22 <0.9.0;

    contract MyPurchase {
        address public seller;

        modifier onlySeller() { // 修改器
            require(
                msg.sender == seller,
                "Only seller can call this."
            );
            _;
        }

        function abort() public onlySeller { // 修改器用法
            // ...
        }
    }
    ```


- event

- struct

相当于对象

## 类型

> “undefined”或“null”值的概念在Solidity中不存在，但是新声明的变量总是有一个 默认值 ，具体的默认值跟类型相关。 要处理任何意外的值，应该使用 错误处理 来恢复整个交易，或者返回一个带有第二个 bool 值的元组表示成功。

- 值类型

    * bool
    * 运算符， 注意== 和！=

- 整型
    * int/unit 有符号/无符号整数，从8位到256， 默认是256

## 语法

- constructor  只在deploy的时候触发，所以如下代码里的sender就是deploy的地址，一般可认为是owner

```js
   constructor() {
        // Store the address of the deployer as a payable address.
        // When we withdraw funds, we'll withdraw here.
        owner = payable(msg.sender);
    }
```
    
- import 

    `import * as A from 'moduleA'` or `import 'moduleA' as A`


##  范围

- private 

- public

- view
  代表只读，且操作无需上链即没有gas消耗
  ```js
      function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
  ```

- 常见疑问：

1. hardhat depoy每次的合约地址都是一样的，是因为是在本地网络，便于迅速验证，deploy到测试网就是不同的地址了。
