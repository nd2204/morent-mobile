# PaymentRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**rentalId** | **string** |  | [default to undefined]
**method** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**returnUrl** | **string** |  | [optional] [default to undefined]
**metadata** | **{ [key: string]: string; }** |  | [optional] [default to undefined]
**paymentProviderId** | **string** |  | [default to undefined]

## Example

```typescript
import { PaymentRequest } from './api';

const instance: PaymentRequest = {
    rentalId,
    method,
    description,
    returnUrl,
    metadata,
    paymentProviderId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
