# PaymentApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPaymentsMethodsGet**](#apipaymentsmethodsget) | **GET** /api/payments/methods | |
|[**apiPaymentsPost**](#apipaymentspost) | **POST** /api/payments | |

# **apiPaymentsMethodsGet**
> Array<PaymentMethodDto> apiPaymentsMethodsGet()


### Example

```typescript
import {
    PaymentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

const { status, data } = await apiInstance.apiPaymentsMethodsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PaymentMethodDto>**

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

# **apiPaymentsPost**
> PaymentResponse apiPaymentsPost(paymentRequest)


### Example

```typescript
import {
    PaymentApi,
    Configuration,
    PaymentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let paymentRequest: PaymentRequest; //

const { status, data } = await apiInstance.apiPaymentsPost(
    paymentRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paymentRequest** | **PaymentRequest**|  | |


### Return type

**PaymentResponse**

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

