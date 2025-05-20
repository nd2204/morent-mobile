# AdminApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiAdminCarCarIdImagesImageIdPost**](#apiadmincarcaridimagesimageidpost) | **POST** /api/admin/car/{carId}/images/{imageId} | |
|[**apiAdminCarCarIdImagesImageIdSetPrimaryPut**](#apiadmincarcaridimagesimageidsetprimaryput) | **PUT** /api/admin/car/{carId}/images/{imageId}/set-primary | |
|[**apiAdminCarCarIdImagesPost**](#apiadmincarcaridimagespost) | **POST** /api/admin/car/{carId}/images | |
|[**apiAdminCarCarIdImagesReorderPut**](#apiadmincarcaridimagesreorderput) | **PUT** /api/admin/car/{carId}/images/reorder | |
|[**apiAdminCarIdDelete**](#apiadmincariddelete) | **DELETE** /api/admin/car/{id} | |
|[**apiAdminCarIdPut**](#apiadmincaridput) | **PUT** /api/admin/car/{id} | |
|[**apiAdminCarPost**](#apiadmincarpost) | **POST** /api/admin/car | |

# **apiAdminCarCarIdImagesImageIdPost**
> apiAdminCarCarIdImagesImageIdPost()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let carId: string; // (default to undefined)
let imageId: string; // (default to undefined)

const { status, data } = await apiInstance.apiAdminCarCarIdImagesImageIdPost(
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

# **apiAdminCarCarIdImagesImageIdSetPrimaryPut**
> CarImageDto apiAdminCarCarIdImagesImageIdSetPrimaryPut()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let carId: string; // (default to undefined)
let imageId: string; // (default to undefined)

const { status, data } = await apiInstance.apiAdminCarCarIdImagesImageIdSetPrimaryPut(
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

# **apiAdminCarCarIdImagesPost**
> CarImageDto apiAdminCarCarIdImagesPost()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let carId: string; // (default to undefined)
let image: File; // (optional) (default to undefined)
let imageUrl: string; // (optional) (default to undefined)
let setAsPrimary: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiAdminCarCarIdImagesPost(
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

# **apiAdminCarCarIdImagesReorderPut**
> apiAdminCarCarIdImagesReorderPut(carImageOrderItem)


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let carId: string; // (default to undefined)
let carImageOrderItem: Array<CarImageOrderItem>; //

const { status, data } = await apiInstance.apiAdminCarCarIdImagesReorderPut(
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

# **apiAdminCarIdDelete**
> apiAdminCarIdDelete()


### Example

```typescript
import {
    AdminApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiAdminCarIdDelete(
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

# **apiAdminCarIdPut**
> apiAdminCarIdPut(updateCarCommand)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    UpdateCarCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let id: string; // (default to undefined)
let updateCarCommand: UpdateCarCommand; //

const { status, data } = await apiInstance.apiAdminCarIdPut(
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

# **apiAdminCarPost**
> apiAdminCarPost(createCarCommand)


### Example

```typescript
import {
    AdminApi,
    Configuration,
    CreateCarCommand
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminApi(configuration);

let createCarCommand: CreateCarCommand; //

const { status, data } = await apiInstance.apiAdminCarPost(
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

