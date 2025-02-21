import { useReadContract } from "wagmi";
import {
  weatherStationAddress,
  weatherStationAddressAbi,
} from "../helpers/contracts";

export const useDenominator = () =>
  useReadContract({
    abi: weatherStationAddressAbi,
    address: weatherStationAddress,
    functionName: "DENOMINATOR",
    query: {
      select: (data: any) => Number(data),
    },
  });
