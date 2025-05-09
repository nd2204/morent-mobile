# RentalDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**carInfo** | [**CarDto**](CarDto.md) |  | [optional] [default to undefined]
**pickupDate** | **string** |  | [optional] [default to undefined]
**dropoffDate** | **string** |  | [optional] [default to undefined]
**pickupLocation** | [**CarLocationDto**](CarLocationDto.md) |  | [optional] [default to undefined]
**dropoffLocation** | [**CarLocationDto**](CarLocationDto.md) |  | [optional] [default to undefined]
**totalCost** | **number** |  | [optional] [default to undefined]
**currency** | **string** |  | [optional] [default to undefined]
**status** | **number** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { RentalDto } from './api';

const instance: RentalDto = {
    id,
    carInfo,
    pickupDate,
    dropoffDate,
    pickupLocation,
    dropoffLocation,
    totalCost,
    currency,
    status,
    createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
