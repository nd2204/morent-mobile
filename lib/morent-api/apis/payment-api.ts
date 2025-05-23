/* tslint:disable */
/* eslint-disable */
/**
 * Morent.WebApi | v1
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { PaymentMethodDto } from '../models';
// @ts-ignore
import type { PaymentRequest } from '../models';
// @ts-ignore
import type { PaymentResponse } from '../models';
/**
 * PaymentApi - axios parameter creator
 * @export
 */
export const PaymentApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPaymentsMethodsGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/payments/methods`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {PaymentRequest} paymentRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPaymentsPost: async (paymentRequest: PaymentRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentRequest' is not null or undefined
            assertParamExists('apiPaymentsPost', 'paymentRequest', paymentRequest)
            const localVarPath = `/api/payments`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(paymentRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PaymentApi - functional programming interface
 * @export
 */
export const PaymentApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PaymentApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPaymentsMethodsGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<PaymentMethodDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiPaymentsMethodsGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['PaymentApi.apiPaymentsMethodsGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {PaymentRequest} paymentRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPaymentsPost(paymentRequest: PaymentRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiPaymentsPost(paymentRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['PaymentApi.apiPaymentsPost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * PaymentApi - factory interface
 * @export
 */
export const PaymentApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PaymentApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPaymentsMethodsGet(options?: RawAxiosRequestConfig): AxiosPromise<Array<PaymentMethodDto>> {
            return localVarFp.apiPaymentsMethodsGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {PaymentApiApiPaymentsPostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPaymentsPost(requestParameters: PaymentApiApiPaymentsPostRequest, options?: RawAxiosRequestConfig): AxiosPromise<PaymentResponse> {
            return localVarFp.apiPaymentsPost(requestParameters.paymentRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiPaymentsPost operation in PaymentApi.
 * @export
 * @interface PaymentApiApiPaymentsPostRequest
 */
export interface PaymentApiApiPaymentsPostRequest {
    /**
     * 
     * @type {PaymentRequest}
     * @memberof PaymentApiApiPaymentsPost
     */
    readonly paymentRequest: PaymentRequest
}

/**
 * PaymentApi - object-oriented interface
 * @export
 * @class PaymentApi
 * @extends {BaseAPI}
 */
export class PaymentApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentApi
     */
    public apiPaymentsMethodsGet(options?: RawAxiosRequestConfig) {
        return PaymentApiFp(this.configuration).apiPaymentsMethodsGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {PaymentApiApiPaymentsPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentApi
     */
    public apiPaymentsPost(requestParameters: PaymentApiApiPaymentsPostRequest, options?: RawAxiosRequestConfig) {
        return PaymentApiFp(this.configuration).apiPaymentsPost(requestParameters.paymentRequest, options).then((request) => request(this.axios, this.basePath));
    }
}

