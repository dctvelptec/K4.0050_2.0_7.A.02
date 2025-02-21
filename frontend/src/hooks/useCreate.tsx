import { useWriteContract } from "wagmi";
import { useExecuteFunction } from "./useExecuteFunction";
import {
  weatherStationAddress,
  weatherStationAddressAbi,
} from "../helpers/contracts";
import { isNumber } from "lodash";

type UseCreateParams = {
  temperature: number | null;
};

export const useCreate = ({ temperature }: UseCreateParams) =>
  useExecuteFunction({
    abi: weatherStationAddressAbi,
    address: weatherStationAddress,
    functionName: "create",
    args: [temperature],
    eventNames: ["Created"],
    enabled: Boolean(isNumber(temperature)),
  });
