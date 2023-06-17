import React from "react";
import { useTable } from "react-table";
import PlaceHolderLoading from "../PlaceHolderLoading";
import NoRecord from "../NoRecord";


const Table = (props) => {
  const { columns = [], data = [], handleProve, loading, error } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <>
      {loading || error ? (
        <PlaceHolderLoading loading={loading} error={error} />
      ) : (
        <div className=" overflow-y-auto py-5 mb-5 md:mb-1">
          <table className="w-full text-center bg-white" {...getTableProps()}>
            <thead className="bg-tableHeadBg text-white border">
              {headerGroups.map((headerGroup, i) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, i) => (
                    <th
                      className="px-3 py-3 border border-white"
                      {...column.getHeaderProps()}
                      key={i}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="space-y-5">
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={i}
                    // onClick={() => {handleProve && handleProve(row)}}
                    className="hover cursor-pointer px-3 py-10 w-full text-center text-primaryText font-primaryFont bg-white rounded-md border border-gray-300"
                  >
                    {row.cells.map((cell, i) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={i}
                          className="px-3 py-3  border border-white"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {data.length < 1 && <NoRecord />}
        </div>
      )}
    </>
  );
};

export default Table;
