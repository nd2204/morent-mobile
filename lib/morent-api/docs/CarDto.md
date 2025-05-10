# CarDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**title** | **string** |  | [default to undefined]
**carModel** | [**CarModelDto**](CarModelDto.md) |  | [default to undefined]
**licensePlate** | **string** |  | [default to undefined]
**pricePerDay** | **number** |  | [default to undefined]
**currency** | **string** |  | [default to undefined]
**images** | [**Array&lt;CarImageDto&gt;**](CarImageDto.md) |  | [default to undefined]
**isAvailable** | **boolean** |  | [default to undefined]
**averageRating** | **number** |  | [default to undefined]
**reviewsCount** | **number** |  | [default to undefined]

## Example

```typescript
import { CarDto } from './api';

const instance: CarDto = {
    id,
    title,
    carModel,
    licensePlate,
    pricePerDay,
    currency,
    images,
    isAvailable,
    averageRating,
    reviewsCount,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
