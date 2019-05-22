<a name="ServerSource"></a>

## ServerSource ⇐ <code>DataSource</code>
ServerSource
A class that can send a api to server to get data list.

**Kind**: global class  
**Extends**: <code>DataSource</code>  

* [ServerSource](#ServerSource) ⇐ <code>DataSource</code>
    * [new ServerSource(api, pageParser, data, keyField, pageSize)](#new_ServerSource_new)
    * [.getData()](#ServerSource+getData)
    * [.getPage()](#ServerSource+getPage)
    * [.getTotalRecords()](#ServerSource+getTotalRecords)
    * [.getPageCount()](#ServerSource+getPageCount)

<a name="new_ServerSource_new"></a>

### new ServerSource(api, pageParser, data, keyField, pageSize)

| Param | Type | Description |
| --- | --- | --- |
| api | <code>String</code> | the url that send to server to get data list. |
| pageParser | <code>Fuction</code> | parse page detail, and the default value is defaultPageParser. |
| data | <code>Arrow</code> | data source list. |
| keyField | <code>String</code> | the key text of map. |
| pageSize | <code>Number</code> | the page size of data list, and the defaulr value is 20. |

<a name="ServerSource+getData"></a>

### serverSource.getData()
**Kind**: instance method of [<code>ServerSource</code>](#ServerSource)  
<a name="ServerSource+getPage"></a>

### serverSource.getPage()
**Kind**: instance method of [<code>ServerSource</code>](#ServerSource)  
<a name="ServerSource+getTotalRecords"></a>

### serverSource.getTotalRecords()
**Kind**: instance method of [<code>ServerSource</code>](#ServerSource)  
<a name="ServerSource+getPageCount"></a>

### serverSource.getPageCount()
**Kind**: instance method of [<code>ServerSource</code>](#ServerSource)  
