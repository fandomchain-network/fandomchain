// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions, type InfiniteData  } from "@tanstack/vue-query";
import { useClient } from '../useClient';

export default function useFandomchainTokenfactoryV_1() {
  const client = useClient();

  type QueryParamsMethod = typeof client.FandomchainTokenfactoryV_1.query.queryParams;
  type QueryParamsData = Awaited<ReturnType<QueryParamsMethod>>["data"];
  const QueryParams = ( options: Partial<UseQueryOptions<QueryParamsData>>) => {
    const key = { type: 'QueryParams',  };    
    return useQuery<QueryParamsData>({ queryKey: [key], queryFn: async () => {
      const res = await client.FandomchainTokenfactoryV_1.query.queryParams();
        return res.data;
    }, ...options});
  }
  

  type QueryGetDenomMethod = typeof client.FandomchainTokenfactoryV_1.query.queryGetDenom;
  type QueryGetDenomData = Awaited<ReturnType<QueryGetDenomMethod>>["data"];
  const QueryGetDenom = (denom: string,  options: Partial<UseQueryOptions<QueryGetDenomData>>) => {
    const key = { type: 'QueryGetDenom',  denom };    
    return useQuery<QueryGetDenomData>({ queryKey: [key], queryFn: async () => {
      const { denom } = key
      const res = await client.FandomchainTokenfactoryV_1.query.queryGetDenom(denom);
        return res.data;
    }, ...options});
  }
  
  type QueryListDenomMethod = typeof client.FandomchainTokenfactoryV_1.query.queryListDenom;
  type QueryListDenomData = Awaited<ReturnType<QueryListDenomMethod>>["data"] & { pageParam: number };
  const QueryListDenom = (query:  NonNullable<Parameters<QueryListDenomMethod>[0]>, options:  Partial<UseInfiniteQueryOptions<QueryListDenomData, unknown, InfiniteData<QueryListDenomData,number>, Array<string | unknown>, number>> , perPage: number) => {
    const key = { type: 'QueryListDenom', query };    
    return useInfiniteQuery<QueryListDenomData, unknown, InfiniteData<QueryListDenomData,number>, Array<string | unknown>, number>({ queryKey: [key], queryFn: async (context: {pageParam?: number}) => {
      const { pageParam=1 } = context;
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      const res = await client.FandomchainTokenfactoryV_1.query.queryListDenom(query ?? undefined);
        return { ...res.data, pageParam }; 
    }, ...options,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  

  type QueryGetBondingCurvePriceMethod = typeof client.FandomchainTokenfactoryV_1.query.queryGetBondingCurvePrice;
  type QueryGetBondingCurvePriceData = Awaited<ReturnType<QueryGetBondingCurvePriceMethod>>["data"];
  const QueryGetBondingCurvePrice = (denom: string,  options: Partial<UseQueryOptions<QueryGetBondingCurvePriceData>>) => {
    const key = { type: 'QueryGetBondingCurvePrice',  denom };    
    return useQuery<QueryGetBondingCurvePriceData>({ queryKey: [key], queryFn: async () => {
      const { denom } = key
      const res = await client.FandomchainTokenfactoryV_1.query.queryGetBondingCurvePrice(denom);
        return res.data;
    }, ...options});
  }
  

  type QueryGetBondingCurveProgressMethod = typeof client.FandomchainTokenfactoryV_1.query.queryGetBondingCurveProgress;
  type QueryGetBondingCurveProgressData = Awaited<ReturnType<QueryGetBondingCurveProgressMethod>>["data"];
  const QueryGetBondingCurveProgress = (denom: string,  options: Partial<UseQueryOptions<QueryGetBondingCurveProgressData>>) => {
    const key = { type: 'QueryGetBondingCurveProgress',  denom };    
    return useQuery<QueryGetBondingCurveProgressData>({ queryKey: [key], queryFn: async () => {
      const { denom } = key
      const res = await client.FandomchainTokenfactoryV_1.query.queryGetBondingCurveProgress(denom);
        return res.data;
    }, ...options});
  }
  

  type QueryEstimateBuyMethod = typeof client.FandomchainTokenfactoryV_1.query.queryEstimateBuy;
  type QueryEstimateBuyData = Awaited<ReturnType<QueryEstimateBuyMethod>>["data"];
  const QueryEstimateBuy = (denom: string, fandom_amount: string,  options: Partial<UseQueryOptions<QueryEstimateBuyData>>) => {
    const key = { type: 'QueryEstimateBuy',  denom,  fandom_amount };    
    return useQuery<QueryEstimateBuyData>({ queryKey: [key], queryFn: async () => {
      const { denom,  fandom_amount } = key
      const res = await client.FandomchainTokenfactoryV_1.query.queryEstimateBuy(denom, fandom_amount);
        return res.data;
    }, ...options});
  }
  

  type QueryEstimateSellMethod = typeof client.FandomchainTokenfactoryV_1.query.queryEstimateSell;
  type QueryEstimateSellData = Awaited<ReturnType<QueryEstimateSellMethod>>["data"];
  const QueryEstimateSell = (denom: string, token_amount: string,  options: Partial<UseQueryOptions<QueryEstimateSellData>>) => {
    const key = { type: 'QueryEstimateSell',  denom,  token_amount };    
    return useQuery<QueryEstimateSellData>({ queryKey: [key], queryFn: async () => {
      const { denom,  token_amount } = key
      const res = await client.FandomchainTokenfactoryV_1.query.queryEstimateSell(denom, token_amount);
        return res.data;
    }, ...options});
  }
  
  return {QueryParams,QueryGetDenom,QueryListDenom,QueryGetBondingCurvePrice,QueryGetBondingCurveProgress,QueryEstimateBuy,QueryEstimateSell,
  }
}
