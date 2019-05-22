## PCI-Iframe 



### Prop Types
Property | Type | Default Value | Is Required | Description
:--- | :--- | :--- | :--- | :---
source|string|'an-aui'|true|flag the source name.
getPCICheckoutIframeUrl|function|undefined|true|a function which will return payment iframe url.
getPCICheckoutPaymentInfoBySessionId|function|undefined|true|a function which will return the credit card info { amsAccountId, creditCardTypeId, creditCardTypeName, maskedCardNumber, expiration } by sessionId.

