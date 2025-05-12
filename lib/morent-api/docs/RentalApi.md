# RentalApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiRentalsCarIdPost**](#apirentalscaridpost) | **POST** /api/rentals/car/{id} | |
|[**apiRentalsGet**](#apirentalsget) | **GET** /api/rentals | |
|[**apiRentalsIdGet**](#apirentalsidget) | **GET** /api/rentals/{id} | |

# **apiRentalsCarIdPost**
> apiRentalsCarIdPost(createRentalRequest)


### Example

```typescript
import {
    RentalApi,
    Configuration,
    CreateRentalRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RentalApi(configuration);

let id: string; // (default to undefined)
let createRentalRequest: CreateRentalRequest; //
let carId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiRentalsCarIdPost(
    id,
    createRentalRequest,
    carId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRentalRequest** | **CreateRentalRequest**|  | |
| **id** | [**string**] |  | defaults to undefined|
| **carId** | [**string**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiRentalsGet**
> Array<RentalDto> apiRentalsGet()


### Example

```typescript
import {
    RentalApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RentalApi(configuration);

const { status, data } = await apiInstance.apiRentalsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<RentalDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiRentalsIdGet**
> RentalDto apiRentalsIdGet()


### Example

```typescript
import {
    RentalApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RentalApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiRentalsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**RentalDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

