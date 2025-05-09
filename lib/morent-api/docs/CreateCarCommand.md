# CreateCarCommand


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**year** | **number** |  | [optional] [default to undefined]
**modelId** | **string** |  | [optional] [default to undefined]
**licensePlate** | **string** |  | [optional] [default to undefined]
**pricePerDay** | **number** |  | [optional] [default to undefined]
**currency** | **string** |  | [optional] [default to undefined]
**location** | [**CarLocationDto**](CarLocationDto.md) |  | [optional] [default to undefined]
**images** | [**Array&lt;UploadCarImageRequest&gt;**](UploadCarImageRequest.md) |  | [optional] [default to undefined]

## Example

```typescript
import { CreateCarCommand } from './api';

const instance: CreateCarCommand = {
    year,
    modelId,
    licensePlate,
    pricePerDay,
    currency,
    location,
    images,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
