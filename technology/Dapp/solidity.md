# Solidity

可以将合约理解为编程语言中的一个类

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
    


