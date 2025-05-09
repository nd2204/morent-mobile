# CarDetailDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**description** | **string** |  | [optional] [default to undefined]
**reviews** | [**Array&lt;ReviewDto&gt;**](ReviewDto.md) |  | [optional] [default to undefined]
**location** | [**CarLocationDto**](CarLocationDto.md) |  | [optional] [default to undefined]
**id** | **string** |  | [optional] [default to undefined]
**carModel** | [**CarModelDto**](CarModelDto.md) |  | [optional] [default to undefined]
**licensePlate** | **string** |  | [optional] [default to undefined]
**pricePerDay** | **number** |  | [optional] [default to undefined]
**currency** | **string** |  | [optional] [default to undefined]
**images** | [**Array&lt;CarImageDto&gt;**](CarImageDto.md) |  | [optional] [default to undefined]
**isAvailable** | **boolean** |  | [optional] [default to undefined]
**averageRating** | **number** |  | [optional] [default to undefined]
**reviewsCount** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { CarDetailDto } from './api';

const instance: CarDetailDto = {
    description,
    reviews,
    location,
    id,
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
