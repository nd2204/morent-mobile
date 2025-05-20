# UserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiUsersMeGet**](#apiusersmeget) | **GET** /api/users/me | |
|[**apiUsersMeProfileImageDelete**](#apiusersmeprofileimagedelete) | **DELETE** /api/users/me/profile-image | |
|[**apiUsersMeProfileImageGet**](#apiusersmeprofileimageget) | **GET** /api/users/me/profile-image | |
|[**apiUsersMeProfileImagePost**](#apiusersmeprofileimagepost) | **POST** /api/users/me/profile-image | |
|[**apiUsersMeRentalsGet**](#apiusersmerentalsget) | **GET** /api/users/me/rentals | |
|[**apiUsersMeRentalsPost**](#apiusersmerentalspost) | **POST** /api/users/me/rentals | |
|[**apiUsersMeReviewsGet**](#apiusersmereviewsget) | **GET** /api/users/me/reviews | |
|[**apiUsersMeReviewsPost**](#apiusersmereviewspost) | **POST** /api/users/me/reviews | |
|[**apiUsersMeReviewsReviewIdPut**](#apiusersmereviewsreviewidput) | **PUT** /api/users/me/reviews/{reviewId} | |
|[**apiUsersUserIdProfileImageGet**](#apiusersuseridprofileimageget) | **GET** /api/users/{userId}/profile-image | |

# **apiUsersMeGet**
> UserDto apiUsersMeGet()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.apiUsersMeGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserDto**

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

# **apiUsersMeProfileImageDelete**
> apiUsersMeProfileImageDelete()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUsersMeProfileImageDelete(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | (optional) defaults to undefined|


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

# **apiUsersMeProfileImageGet**
> apiUsersMeProfileImageGet()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.apiUsersMeProfileImageGet();
```

### Parameters
This endpoint does not have any parameters.


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
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUsersMeProfileImagePost**
> UserProfileImageDto apiUsersMeProfileImagePost()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userId: string; // (optional) (default to undefined)
let image: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUsersMeProfileImagePost(
    userId,
    image
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | (optional) defaults to undefined|
| **image** | [**File**] |  | (optional) defaults to undefined|


### Return type

**UserProfileImageDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUsersMeRentalsGet**
> Array<RentalDto> apiUsersMeRentalsGet()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.apiUsersMeRentalsGet();
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

# **apiUsersMeRentalsPost**
> RentalDto apiUsersMeRentalsPost(createRentalRequest)


### Example

```typescript
import {
    UserApi,
    Configuration,
    CreateRentalRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let createRentalRequest: CreateRentalRequest; //

const { status, data } = await apiInstance.apiUsersMeRentalsPost(
    createRentalRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRentalRequest** | **CreateRentalRequest**|  | |


### Return type

**RentalDto**

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

# **apiUsersMeReviewsGet**
> Array<UserCarsReviewDto> apiUsersMeReviewsGet()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.apiUsersMeReviewsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<UserCarsReviewDto>**

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

# **apiUsersMeReviewsPost**
> ReviewDto apiUsersMeReviewsPost(leaveReviewRequest)


### Example

```typescript
import {
    UserApi,
    Configuration,
    LeaveReviewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let leaveReviewRequest: LeaveReviewRequest; //

const { status, data } = await apiInstance.apiUsersMeReviewsPost(
    leaveReviewRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **leaveReviewRequest** | **LeaveReviewRequest**|  | |


### Return type

**ReviewDto**

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

# **apiUsersMeReviewsReviewIdPut**
> string apiUsersMeReviewsReviewIdPut(updateReviewRequest)


### Example

```typescript
import {
    UserApi,
    Configuration,
    UpdateReviewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let reviewId: string; // (default to undefined)
let updateReviewRequest: UpdateReviewRequest; //

const { status, data } = await apiInstance.apiUsersMeReviewsReviewIdPut(
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

# **apiUsersUserIdProfileImageGet**
> UserProfileImageDto apiUsersUserIdProfileImageGet()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.apiUsersUserIdProfileImageGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**UserProfileImageDto**

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

