# CarApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiCarsCarIdImagesGet**](#apicarscaridimagesget) | **GET** /api/cars/{carId}/images | |
|[**apiCarsGet**](#apicarsget) | **GET** /api/cars | |
|[**apiCarsIdGet**](#apicarsidget) | **GET** /api/cars/{id} | |
|[**apiCarsIdReviewsGet**](#apicarsidreviewsget) | **GET** /api/cars/{id}/reviews | |

# **apiCarsCarIdImagesGet**
> Array<CarImageDto> apiCarsCarIdImagesGet()


### Example

```typescript
import {
    CarApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CarApi(configuration);

let carId: string; // (default to undefined)

const { status, data } = await apiInstance.apiCarsCarIdImagesGet(
    carId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **carId** | [**string**] |  | defaults to undefined|


### Return type

**Array<CarImageDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCarsGet**
> Array<CarDto> apiCarsGet()


### Example

```typescript
import {
    CarApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CarApi(configuration);

let carFilterBrand: string; // (optional) (default to undefined)
let carFilterType: string; // (optional) (default to undefined)
let carFilterCapacity: number; // (optional) (default to undefined)
let carFilterFuelType: string; // (optional) (default to undefined)
let carFilterGearbox: string; // (optional) (default to undefined)
let carFilterMinPrice: number; // (optional) (default to undefined)
let carFilterMaxPrice: number; // (optional) (default to undefined)
let carFilterRating: number; // (optional) (default to undefined)
let carFilterLocation: string; // (optional) (default to undefined)
let carFilterSearch: string; // (optional) (default to undefined)
let carFilterSort: string; // (optional) (default to undefined)
let pagedQueryPage: number; // (optional) (default to undefined)
let pagedQueryPageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiCarsGet(
    carFilterBrand,
    carFilterType,
    carFilterCapacity,
    carFilterFuelType,
    carFilterGearbox,
    carFilterMinPrice,
    carFilterMaxPrice,
    carFilterRating,
    carFilterLocation,
    carFilterSearch,
    carFilterSort,
    pagedQueryPage,
    pagedQueryPageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **carFilterBrand** | [**string**] |  | (optional) defaults to undefined|
| **carFilterType** | [**string**] |  | (optional) defaults to undefined|
| **carFilterCapacity** | [**number**] |  | (optional) defaults to undefined|
| **carFilterFuelType** | [**string**] |  | (optional) defaults to undefined|
| **carFilterGearbox** | [**string**] |  | (optional) defaults to undefined|
| **carFilterMinPrice** | [**number**] |  | (optional) defaults to undefined|
| **carFilterMaxPrice** | [**number**] |  | (optional) defaults to undefined|
| **carFilterRating** | [**number**] |  | (optional) defaults to undefined|
| **carFilterLocation** | [**string**] |  | (optional) defaults to undefined|
| **carFilterSearch** | [**string**] |  | (optional) defaults to undefined|
| **carFilterSort** | [**string**] |  | (optional) defaults to undefined|
| **pagedQueryPage** | [**number**] |  | (optional) defaults to undefined|
| **pagedQueryPageSize** | [**number**] |  | (optional) defaults to undefined|


### Return type

**Array<CarDto>**

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

# **apiCarsIdGet**
> CarDetailDto apiCarsIdGet()


### Example

```typescript
import {
    CarApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CarApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCarsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**CarDetailDto**

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

# **apiCarsIdReviewsGet**
> Array<ReviewDto> apiCarsIdReviewsGet()


### Example

```typescript
import {
    CarApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CarApi(configuration);

let id: string; // (default to undefined)
let carId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiCarsIdReviewsGet(
    id,
    carId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|
| **carId** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<ReviewDto>**

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

