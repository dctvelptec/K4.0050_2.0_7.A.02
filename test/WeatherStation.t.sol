// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {WeatherStation} from "../src/WeatherStation.sol";

contract WeatherStationTest is Test {
    WeatherStation public ws;

    function setUp() public {
        ws = new WeatherStation();
    }

    function test_Create() public {
        vm.warp(1337);
        vm.expectEmit();
        emit WeatherStation.Created(1, 1337);
        ws.create(1);
    }

    function test_CreateNegative() public {
        vm.warp(1337);
        vm.expectEmit();
        emit WeatherStation.Created(-1, 1337);
        ws.create(-1);
    }

    function test_TotalEntries() public {
        assertEq(ws.totalEntries(), 0);
        ws.create(1);
        assertEq(ws.totalEntries(), 1);
    }

    function test_List() public {
        uint256 _createAmount = 24;
        for (uint256 i = 0; i < _createAmount; i++) {
            vm.warp(1337 + i);
            ws.create(int256(i + 1));
        }

        // first page
        WeatherStation.ListResponse memory _resFirstPage = ws.list(WeatherStation.ListRequest({limit: 10, offset: 0}));

        assertEq(_resFirstPage.data.length, 10);
        assertEq(_resFirstPage.limit, 10);
        assertEq(_resFirstPage.offset, 0);
        assertEq(_resFirstPage.total, _createAmount);

        // mid page
        WeatherStation.ListResponse memory _resMidPage = ws.list(WeatherStation.ListRequest({limit: 10, offset: 10}));

        assertEq(_resMidPage.data.length, 10);
        assertEq(_resMidPage.limit, 10);
        assertEq(_resMidPage.offset, 10);
        assertEq(_resMidPage.total, _createAmount);

        // last page
        WeatherStation.ListResponse memory _resLastPage = ws.list(WeatherStation.ListRequest({limit: 10, offset: 20}));

        assertEq(_resLastPage.data.length, 4);
        assertEq(_resLastPage.limit, 4);
        assertEq(_resLastPage.offset, 20);
        assertEq(_resLastPage.total, _createAmount);

        // non-existing page
        WeatherStation.ListResponse memory _resNonExistingPage =
            ws.list(WeatherStation.ListRequest({limit: 10, offset: 100}));

        assertEq(_resNonExistingPage.data.length, 0);
        assertEq(_resNonExistingPage.limit, 0);
        assertEq(_resNonExistingPage.offset, 100);
        assertEq(_resNonExistingPage.total, _createAmount);
    }
}
