# ReviewApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiReviewsCarCarIdGet**](#apireviewscarcaridget) | **GET** /api/reviews/car/{carId} | |
|[**apiReviewsCarCarIdPost**](#apireviewscarcaridpost) | **POST** /api/reviews/car/{carId} | |
|[**apiReviewsReviewIdPut**](#apireviewsreviewidput) | **PUT** /api/reviews/{reviewId} | |

# **apiReviewsCarCarIdGet**
> Array<ReviewDto> apiReviewsCarCarIdGet()


### Example

```typescript
import {
    ReviewApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewApi(configuration);

let carId: string; // (default to undefined)

const { status, data } = await apiInstance.apiReviewsCarCarIdGet(
    carId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **carId** | [**string**] |  | defaults to undefined|


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

# **apiReviewsCarCarIdPost**
> string apiReviewsCarCarIdPost(leaveReviewRequest)


### Example

```typescript
import {
    ReviewApi,
    Configuration,
    LeaveReviewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewApi(configuration);

let carId: string; // (default to undefined)
let leaveReviewRequest: LeaveReviewRequest; //

const { status, data } = await apiInstance.apiReviewsCarCarIdPost(
    carId,
    leaveReviewRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **leaveReviewRequest** | **LeaveReviewRequest**|  | |
| **carId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiReviewsReviewIdPut**
> string apiReviewsReviewIdPut(updateReviewRequest)


### Example

```typescript
import {
    ReviewApi,
    Configuration,
    UpdateReviewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewApi(configuration);

let reviewId: string; // (default to undefined)
let updateReviewRequest: UpdateReviewRequest; //

const { status, data } = await apiInstance.apiReviewsReviewIdPut(
    reviewId,
    updateReviewRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateReviewRequest** | **UpdateReviewRequest**|  | |
| **reviewId** | [**string**] |  | defaults to undefined|


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

