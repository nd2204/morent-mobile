# CarApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiCarsCarIdImagesGet**](#apicarscaridimagesget) | **GET** /api/cars/{carId}/images | |
|[**apiCarsCarIdImagesImageIdPost**](#apicarscaridimagesimageidpost) | **POST** /api/cars/{carId}/images/{imageId} | |
|[**apiCarsCarIdImagesImageIdSetPrimaryPut**](#apicarscaridimagesimageidsetprimaryput) | **PUT** /api/cars/{carId}/images/{imageId}/set-primary | |
|[**apiCarsCarIdImagesPost**](#apicarscaridimagespost) | **POST** /api/cars/{carId}/images | |
|[**apiCarsCarIdImagesReorderPut**](#apicarscaridimagesreorderput) | **PUT** /api/cars/{carId}/images/reorder | |
|[**apiCarsGet**](#apicarsget) | **GET** /api/cars | |
|[**apiCarsIdDelete**](#apicarsiddelete) | **DELETE** /api/cars/{id} | |
|[**apiCarsIdGet**](#apicarsidget) | **GET** /api/cars/{id} | |
|[**apiCarsIdPut**](#apicarsidput) | **PUT** /api/cars/{id} | |
|[**apiCarsPost**](#apicarspost) | **POST** /api/cars | |

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

# **apiCarsCarIdImagesImageIdPost**
> apiCarsCarIdImagesImageIdPost()


### Example

```typescript
import {
    CarApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CarApi(configuration);

let carId: string; // (default to undefined)
let imageId: string; // (default to undefined)

const { status, data } = await apiInstance.apiCarsCarIdImagesImageIdPost(
    carId,
    imageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **carId** | [**string**] |  | defaults to undefined|
| **imageId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | No Content |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCarsCarIdImagesImageIdSetPrimaryPut**
> CarImageDto apiCarsCarIdImagesImageIdSetPrimaryPut()


### Example

```typescript
import {
    CarApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CarApi(configuration);

let carId: string; // (default to undefined)
let imageId: string; // (default to undefined)

const { status, data } = await apiInstance.apiCarsCarIdImagesImageIdSetPrimaryPut(
    carId,
    imageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **carId** | [**string**] |  | defaults to undefined|
| **imageId** | [**string**] |  | defaults to undefined|


### Return type

**CarImageDto**

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
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCarsCarIdImagesPost**
> CarImageDto apiCarsCarIdImagesPost()


### Example

```typescript
import {
    CarApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CarApi(configuration);

let carId: string; // (default to undefined)
let image: File; // (optional) (default to undefined)
let imageUrl: string; // (optional) (default to undefined)
let setAsPrimary: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiCarsCarIdImagesPost(
    carId,
    image,
    imageUrl,
    setAsPrimary
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **carId** | [**string**] |  | defaults to undefined|
| **image** | [**File**] |  | (optional) defaults to undefined|
| **imageUrl** | [**string**] |  | (optional) defaults to undefined|
| **setAsPrimary** | [**boolean**] |  | (optional) defaults to undefined|


### Return type

**CarImageDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCarsCarIdImagesReorderPut**
> apiCarsCarIdImagesReorderPut(carImageOrderItem)


### Example

```typescript
import {
    CarApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CarApi(configuration);

let carId: string; // (default to undefined)
let carImageOrderItem: Array<CarImageOrderItem>; //

const { status, data } = await apiInstance.apiCarsCarIdImagesReorderPut(
    carId,
    carImageOrderItem
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **carImageOrderItem** | **Array<CarImageOrderItem>**|  | |
| **carId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

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

# **apiCarsIdDelete**
> apiCarsIdDelete()


### Example

```typescript
import {
    CarApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CarApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCarsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


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

# **apiCarsIdPut**
> apiCarsIdPut(updateCarCommand)


### Example

```typescript
import {
    CarApi,
    Configuration,
    UpdateCarCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new CarApi(configuration);

let id: string; // (default to undefined)
let updateCarCommand: UpdateCarCommand; //

const { status, data } = await apiInstance.apiCarsIdPut(
    id,
    updateCarCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCarCommand** | **UpdateCarCommand**|  | |
| **id** | [**string**] |  | defaults to undefined|


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

# **apiCarsPost**
> apiCarsPost(createCarCommand)


### Example

```typescript
import {
    CarApi,
    Configuration,
    CreateCarCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new CarApi(configuration);

let createCarCommand: CreateCarCommand; //

const { status, data } = await apiInstance.apiCarsPost(
    createCarCommand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCarCommand** | **CreateCarCommand**|  | |


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

