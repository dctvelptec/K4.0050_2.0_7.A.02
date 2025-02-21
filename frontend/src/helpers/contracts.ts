import { Abi } from "viem";

export const weatherStationAddress =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const weatherStationAddressAbi: Abi = [
  {
    type: "function",
    name: "DENOMINATOR",
    inputs: [],
    outputs: [{ name: "", type: "uint16", internalType: "uint16" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "create",
    inputs: [{ name: "_temperature", type: "int256", internalType: "int256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "list",
    inputs: [
      {
        name: "_req",
        type: "tuple",
        internalType: "struct WeatherStation.ListRequest",
        components: [
          { name: "limit", type: "uint256", internalType: "uint256" },
          { name: "offset", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [
      {
        name: "_res",
        type: "tuple",
        internalType: "struct WeatherStation.ListResponse",
        components: [
          {
            name: "data",
            type: "tuple[]",
            internalType: "struct WeatherStation.Data[]",
            components: [
              {
                name: "temperature",
                type: "int256",
                internalType: "int256",
              },
              {
                name: "timestamp",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          { name: "limit", type: "uint256", internalType: "uint256" },
          { name: "offset", type: "uint256", internalType: "uint256" },
          { name: "total", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "temperatures",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "temperature", type: "int256", internalType: "int256" },
      { name: "timestamp", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalEntries",
    inputs: [],
    outputs: [
      {
        name: "_totalEntries",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Created",
    inputs: [
      {
        name: "temperature",
        type: "int256",
        indexed: false,
        internalType: "int256",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
];
