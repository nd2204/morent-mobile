# PaymentResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**transactionId** | **string** |  | [optional] [default to undefined]
**status** | **number** |  | [default to undefined]
**paymentUrl** | **string** |  | [optional] [default to undefined]
**message** | **string** |  | [optional] [default to undefined]
**providerData** | **{ [key: string]: string; }** |  | [optional] [default to undefined]

## Example

```typescript
import { PaymentResponse } from './api';

const instance: PaymentResponse = {
    transactionId,
    status,
    paymentUrl,
    message,
    providerData,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
