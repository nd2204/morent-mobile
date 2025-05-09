# UserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiUsersMeGet**](#apiusersmeget) | **GET** /api/users/me | |
|[**apiUsersMeProfileImageGet**](#apiusersmeprofileimageget) | **GET** /api/users/me/profile-image | |
|[**apiUsersMeRentalsGet**](#apiusersmerentalsget) | **GET** /api/users/me/rentals | |
|[**apiUsersMeReviewsGet**](#apiusersmereviewsget) | **GET** /api/users/me/reviews | |
|[**apiUsersUserIdProfileImageDelete**](#apiusersuseridprofileimagedelete) | **DELETE** /api/users/{userId}/profile-image | |
|[**apiUsersUserIdProfileImageGet**](#apiusersuseridprofileimageget) | **GET** /api/users/{userId}/profile-image | |
|[**apiUsersUserIdProfileImagePost**](#apiusersuseridprofileimagepost) | **POST** /api/users/{userId}/profile-image | |

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

# **apiUsersMeProfileImageGet**
> UserProfileImageDto apiUsersMeProfileImageGet()


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUsersMeRentalsGet**
> apiUsersMeRentalsGet()


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

# **apiUsersMeReviewsGet**
> UserCarsReviewDto apiUsersMeReviewsGet()


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

**UserCarsReviewDto**

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

# **apiUsersUserIdProfileImageDelete**
> apiUsersUserIdProfileImageDelete()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.apiUsersUserIdProfileImageDelete(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


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

# **apiUsersUserIdProfileImagePost**
> UserProfileImageDto apiUsersUserIdProfileImagePost()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userId: string; // (default to undefined)
let image: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUsersUserIdProfileImagePost(
    userId,
    image
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|
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

