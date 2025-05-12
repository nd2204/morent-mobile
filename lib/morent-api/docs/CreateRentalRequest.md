# CreateRentalRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**carId** | **string** |  | [default to undefined]
**pickupDate** | **string** |  | [default to undefined]
**dropoffDate** | **string** |  | [default to undefined]
**pickupLocation** | [**CarLocationDto**](CarLocationDto.md) |  | [default to undefined]
**dropoffLocation** | [**CarLocationDto**](CarLocationDto.md) |  | [default to undefined]

## Example

```typescript
import { CreateRentalRequest } from './api';

const instance: CreateRentalRequest = {
    carId,
    pickupDate,
    dropoffDate,
    pickupLocation,
    dropoffLocation,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
