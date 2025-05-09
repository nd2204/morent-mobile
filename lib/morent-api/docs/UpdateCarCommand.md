# UpdateCarCommand


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**pricePerDay** | **number** |  | [optional] [default to undefined]
**currency** | **string** |  | [optional] [default to undefined]
**isAvailable** | **boolean** |  | [optional] [default to undefined]
**location** | [**CarLocationDto**](CarLocationDto.md) |  | [optional] [default to undefined]
**imagesToAdd** | [**Array&lt;UploadCarImageRequest&gt;**](UploadCarImageRequest.md) |  | [optional] [default to undefined]
**imagesToDelete** | **Array&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { UpdateCarCommand } from './api';

const instance: UpdateCarCommand = {
    id,
    pricePerDay,
    currency,
    isAvailable,
    location,
    imagesToAdd,
    imagesToDelete,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
