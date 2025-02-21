// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract WeatherStation {
    uint16 public constant DENOMINATOR = 10000;

    event Created(int256 temperature, uint256 timestamp);

    struct Data {
        int256 temperature;
        uint256 timestamp;
    }

    struct ListRequest {
        uint256 limit;
        uint256 offset;
    }

    struct ListResponse {
        Data[] data;
        uint256 limit;
        uint256 offset;
        uint256 total;
    }

    Data[] public temperatures;

    /// Creates a temperature data point
    /// @param _temperature temperatur in basis points (100 = 0.01)
    function create(int256 _temperature) external {
        uint256 _timestamp = block.timestamp;
        temperatures.push(Data({temperature: _temperature, timestamp: _timestamp}));
        emit Created(_temperature, _timestamp);
    }

    /// Paginated list of temperature data
    /// @param _req limit and offset for list
    function list(ListRequest calldata _req) external view returns (ListResponse memory _res) {
        _res.total = temperatures.length;
        _res.offset = _req.offset;

        if (_req.offset > _res.total) return _res;

        _res.limit = _req.limit;
        if (_req.offset + _req.limit > _res.total) {
            _res.limit = _res.total - _req.offset;
        }

        _res.data = new Data[](_res.limit);

        for (uint256 i = 0; i < _res.limit; i++) {
            _res.data[i].temperature = temperatures[_req.offset + i].temperature;
            _res.data[i].timestamp = temperatures[_req.offset + i].timestamp;
        }
    }

    /// Response of total amount ot existing temperature points
    function totalEntries() external view returns (uint256 _totalEntries) {
        _totalEntries = temperatures.length;
    }
}
