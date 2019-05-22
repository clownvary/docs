<a name="IDataSource"></a>

## IDataSource
**Kind**: global interface  

* [IDataSource](#IDataSource)
    * [.getData()](#IDataSource+getData) ⇒ <code>array</code>
    * [.getKeyField()](#IDataSource+getKeyField) ⇒ <code>string</code>
    * [.getPage()](#IDataSource+getPage) ⇒ <code>number</code>
    * [.getTotalRecords()](#IDataSource+getTotalRecords) ⇒ <code>number</code>
    * [.getPageCount()](#IDataSource+getPageCount) ⇒ <code>number</code>
    * [.sort(fields, sortOrder)](#IDataSource+sort)
    * [.clearSort()](#IDataSource+clearSort)
    * [.filter()](#IDataSource+filter)
    * [.clearFilter()](#IDataSource+clearFilter)

<a name="IDataSource+getData"></a>

### iDataSource.getData() ⇒ <code>array</code>
Get data list

**Kind**: instance method of [<code>IDataSource</code>](#IDataSource)  
<a name="IDataSource+getKeyField"></a>

### iDataSource.getKeyField() ⇒ <code>string</code>
Get key field

**Kind**: instance method of [<code>IDataSource</code>](#IDataSource)  
<a name="IDataSource+getPage"></a>

### iDataSource.getPage() ⇒ <code>number</code>
Get page number

**Kind**: instance method of [<code>IDataSource</code>](#IDataSource)  
<a name="IDataSource+getTotalRecords"></a>

### iDataSource.getTotalRecords() ⇒ <code>number</code>
Get total records

**Kind**: instance method of [<code>IDataSource</code>](#IDataSource)  
<a name="IDataSource+getPageCount"></a>

### iDataSource.getPageCount() ⇒ <code>number</code>
Get page count

**Kind**: instance method of [<code>IDataSource</code>](#IDataSource)  
<a name="IDataSource+sort"></a>

### iDataSource.sort(fields, sortOrder)
Sort the data

**Kind**: instance method of [<code>IDataSource</code>](#IDataSource)  

| Param | Type | Description |
| --- | --- | --- |
| fields | <code>array</code> |  |
| sortOrder | <code>string</code> | the default order is ASC. |

<a name="IDataSource+clearSort"></a>

### iDataSource.clearSort()
Clear sort

**Kind**: instance method of [<code>IDataSource</code>](#IDataSource)  
<a name="IDataSource+filter"></a>

### iDataSource.filter()
Filter the data

**Kind**: instance method of [<code>IDataSource</code>](#IDataSource)  
<a name="IDataSource+clearFilter"></a>

### iDataSource.clearFilter()
Clear filter

**Kind**: instance method of [<code>IDataSource</code>](#IDataSource)  
