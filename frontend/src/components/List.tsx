import { useEffect, useState } from "react";
import { useDenominator } from "../hooks/useDenominator";
import { useList } from "../hooks/useList";

export const List = () => {
  const LIMIT = 1;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data: denominator } = useDenominator();

  const list = useList({ limit: LIMIT, offset: page * LIMIT - LIMIT });

  useEffect(() => {
    if (list.data && list.data.total > 0)
      setTotalPages(Math.ceil(list.data.total / LIMIT));
    else setTotalPages(1);
  }, [list.data]);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-bold">Weather Data List</div>
      {!list.data?.total ? (
        <div>No data available</div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
              <thead>
                <tr>
                  <th>Temperatur (°C)</th>
                  <th>Datum + Uhrzeit</th>
                </tr>
              </thead>
              <tbody>
                {list.data.data.map((dataNode: any, i: number) => (
                  <tr key={i}>
                    <td>
                      {(
                        Number(dataNode.temperature) / Number(denominator)
                      ).toLocaleString("de")}
                      °C
                    </td>
                    <td>
                      {new Date(
                        Number(dataNode.timestamp) * 1000
                      ).toLocaleString("de", {
                        dateStyle: "full",
                        timeStyle: "medium",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="join mx-auto">
              <button
                onClick={() => page > 2 && setPage(1)}
                className={`join-item btn ${page > 2 ? "" : "btn-disabled"}`}
              >
                &laquo;&laquo;
              </button>

              <button
                onClick={() => page > 1 && setPage(page - 1)}
                className={`join-item btn ${page > 1 ? "" : "btn-disabled"}`}
              >
                &laquo;
              </button>
              <button className="join-item btn btn-disabled">{page}</button>

              <button
                onClick={() => totalPages > page && setPage(page + 1)}
                className={`join-item btn ${
                  totalPages > page ? "" : "btn-disabled"
                }`}
              >
                &raquo;
              </button>
              <button
                onClick={() => totalPages != page && setPage(totalPages)}
                className={`join-item btn ${
                  totalPages != page ? "" : "btn-disabled"
                }`}
              >
                &raquo;&raquo;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
