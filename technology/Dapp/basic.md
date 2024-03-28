# 基础知识

1. gas 和 gwei， [看这个](https://learnblockchain.cn/books/geth/part1/gas.html)

   gas limit 设置上限防止浪费，但如果limit设置的太低，不够合约运算所用的，就会发生out gas 白白浪费

   所以每次操作步骤是：

   1. 查看最新不同类型的操作gas price 和gas use
   2. 设置合适的limit
   3. 做对应的操作

2. Opensea inactive list漏洞。

    当你把一个nft以很低的价格挂单且没有被出售，这时候你把这个转移到了另一个钱包，这时候这个挂单就会变成inactive list.
    一旦你把这个nft充新转移回来后，别人还是能以之前的低价挂单购买，因为还是inactive list。 所以这种情况要自己取消inactive list

3. 合约账户被称为内部账户，普通账户称为外部账户

4. Transactions 从最后往前看，因为最先成功的都是gas比较高的，所以基本是从高往低的排列

4. NFT技巧

    a. 查看火热项目：通过gas price插件查看gas,如果突然升高说明可以去最新的区块看相应的transaction 然后就可以知道当前哪个项目在mint

    b. 查看当前项目的holder和mint进度：合约中点击token 即可查看当前holder和supply