import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { QueryParamsResponse } from "./types/fandomchain/tokenfactory/v1/query";
import { QueryGetDenomResponse } from "./types/fandomchain/tokenfactory/v1/query";
import { QueryAllDenomResponse } from "./types/fandomchain/tokenfactory/v1/query";
import { QueryGetBondingCurvePriceResponse } from "./types/fandomchain/tokenfactory/v1/query";
import { QueryGetBondingCurveProgressResponse } from "./types/fandomchain/tokenfactory/v1/query";
import { QueryEstimateBuyResponse } from "./types/fandomchain/tokenfactory/v1/query";
import { QueryEstimateSellResponse } from "./types/fandomchain/tokenfactory/v1/query";

import { QueryParamsRequest } from "./types/fandomchain/tokenfactory/v1/query";
import { QueryGetDenomRequest } from "./types/fandomchain/tokenfactory/v1/query";
import { QueryAllDenomRequest } from "./types/fandomchain/tokenfactory/v1/query";
import { QueryGetBondingCurvePriceRequest } from "./types/fandomchain/tokenfactory/v1/query";
import { QueryGetBondingCurveProgressRequest } from "./types/fandomchain/tokenfactory/v1/query";
import { QueryEstimateBuyRequest } from "./types/fandomchain/tokenfactory/v1/query";
import { QueryEstimateSellRequest } from "./types/fandomchain/tokenfactory/v1/query";


import type {SnakeCasedPropertiesDeep} from 'type-fest';

export type QueryParamsType = Record<string | number, any>;

export type FlattenObject<TValue> = CollapseEntries<CreateObjectEntries<TValue, TValue>>;

type Entry = { key: string; value: unknown };
type EmptyEntry<TValue> = { key: ''; value: TValue };
type ExcludedTypes = Date | Set<unknown> | Map<unknown, unknown>;
type ArrayEncoder = `[${bigint}]`;

type EscapeArrayKey<TKey extends string> = TKey extends `${infer TKeyBefore}.${ArrayEncoder}${infer TKeyAfter}`
  ? EscapeArrayKey<`${TKeyBefore}${ArrayEncoder}${TKeyAfter}`>
  : TKey;

// Transforms entries to one flattened type
type CollapseEntries<TEntry extends Entry> = {
  [E in TEntry as EscapeArrayKey<E['key']>]: E['value'];
};

// Transforms array type to object
type CreateArrayEntry<TValue, TValueInitial> = OmitItself<
  TValue extends unknown[] ? { [k: ArrayEncoder]: TValue[number] } : TValue,
  TValueInitial
>;

// Omit the type that references itself
type OmitItself<TValue, TValueInitial> = TValue extends TValueInitial
  ? EmptyEntry<TValue>
  : OmitExcludedTypes<TValue, TValueInitial>;

// Omit the type that is listed in ExcludedTypes union
type OmitExcludedTypes<TValue, TValueInitial> = TValue extends ExcludedTypes
  ? EmptyEntry<TValue>
  : CreateObjectEntries<TValue, TValueInitial>;

type CreateObjectEntries<TValue, TValueInitial> = TValue extends object
  ? {
      // Checks that Key is of type string
      [TKey in keyof TValue]-?: TKey extends string
        ? // Nested key can be an object, run recursively to the bottom
          CreateArrayEntry<TValue[TKey], TValueInitial> extends infer TNestedValue
          ? TNestedValue extends Entry
            ? TNestedValue['key'] extends ''
              ? {
                  key: TKey;
                  value: TNestedValue['value'];
                }
              :
                  | {
                      key: `${TKey}.${TNestedValue['key']}`;
                      value: TNestedValue['value'];
                    }
                  | {
                      key: TKey;
                      value: TValue[TKey];
                    }
            : never
          : never
        : never;
    }[keyof TValue] // Builds entry for each key
  : EmptyEntry<TValue>;

export type ChangeProtoToJSPrimitives<T extends object> = {
  [key in keyof T]: T[key] extends Uint8Array | Date ? string :  T[key] extends object ? ChangeProtoToJSPrimitives<T[key]>: T[key];
  // ^^^^ This line is used to convert Uint8Array to string, if you want to keep Uint8Array as is, you can remove this line
}

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers ),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    } as AxiosRequestConfig;
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title fandomchain.tokenfactory.v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * QueryParams
   *
   * @tags Query
   * @name queryParams
   * @request GET:/fandomChain/tokenfactory/v1/params
   */
  queryParams = (
    query?: Record<string, any>,
    params: RequestParams = {},
  ) =>
    this.request<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryParamsResponse>>>({
      path: `/fandomChain/tokenfactory/v1/params`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  
  /**
   * QueryGetDenom
   *
   * @tags Query
   * @name queryGetDenom
   * @request GET:/fandomChain/tokenfactory/v1/denom/{denom}
   */
  queryGetDenom = (denom: string,
    query?: Record<string, any>,
    params: RequestParams = {},
  ) =>
    this.request<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryGetDenomResponse>>>({
      path: `/fandomChain/tokenfactory/v1/denom/${denom}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  
  /**
   * QueryListDenom
   *
   * @tags Query
   * @name queryListDenom
   * @request GET:/fandomChain/tokenfactory/v1/denom
   */
  queryListDenom = (
    query?: Omit<FlattenObject<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryAllDenomRequest>>>,"">,
    params: RequestParams = {},
  ) =>
    this.request<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryAllDenomResponse>>>({
      path: `/fandomChain/tokenfactory/v1/denom`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  
  /**
   * QueryGetBondingCurvePrice
   *
   * @tags Query
   * @name queryGetBondingCurvePrice
   * @request GET:/fandomChain/tokenfactory/v1/bonding_curve_price/{denom}
   */
  queryGetBondingCurvePrice = (denom: string,
    query?: Record<string, any>,
    params: RequestParams = {},
  ) =>
    this.request<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryGetBondingCurvePriceResponse>>>({
      path: `/fandomChain/tokenfactory/v1/bonding_curve_price/${denom}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  
  /**
   * QueryGetBondingCurveProgress
   *
   * @tags Query
   * @name queryGetBondingCurveProgress
   * @request GET:/fandomChain/tokenfactory/v1/bonding_curve_progress/{denom}
   */
  queryGetBondingCurveProgress = (denom: string,
    query?: Record<string, any>,
    params: RequestParams = {},
  ) =>
    this.request<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryGetBondingCurveProgressResponse>>>({
      path: `/fandomChain/tokenfactory/v1/bonding_curve_progress/${denom}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  
  /**
   * QueryEstimateBuy
   *
   * @tags Query
   * @name queryEstimateBuy
   * @request GET:/fandomChain/tokenfactory/v1/estimate_buy/{denom}/{fandom_amount}
   */
  queryEstimateBuy = (denom: string, fandom_amount: string,
    query?: Record<string, any>,
    params: RequestParams = {},
  ) =>
    this.request<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryEstimateBuyResponse>>>({
      path: `/fandomChain/tokenfactory/v1/estimate_buy/${denom}/${fandom_amount}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  
  /**
   * QueryEstimateSell
   *
   * @tags Query
   * @name queryEstimateSell
   * @request GET:/fandomChain/tokenfactory/v1/estimate_sell/{denom}/{token_amount}
   */
  queryEstimateSell = (denom: string, token_amount: string,
    query?: Record<string, any>,
    params: RequestParams = {},
  ) =>
    this.request<SnakeCasedPropertiesDeep<ChangeProtoToJSPrimitives<QueryEstimateSellResponse>>>({
      path: `/fandomChain/tokenfactory/v1/estimate_sell/${denom}/${token_amount}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  
}