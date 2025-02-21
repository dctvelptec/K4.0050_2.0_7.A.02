import { useReadContract } from "wagmi";
import {
  weatherStationAddress,
  weatherStationAddressAbi,
} from "../helpers/contracts";

type UseListParams = { limit: number; offset: number };

export const useList = ({ limit, offset }: UseListParams) =>
  useReadContract({
    abi: weatherStationAddressAbi,
    address: weatherStationAddress,
    functionName: "list",
    args: [{ limit, offset }],
    query: {
      refetchInterval: 1000,
      select: (data: any) => ({
        data: data.data,
        limit: Number(data.limit),
        offset: Number(data.offset),
        total: Number(data.total),
      }),
    },
  });
