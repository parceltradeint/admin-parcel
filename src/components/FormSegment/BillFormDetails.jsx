import NoRecord from "@/common/NoRecord";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sumBy } from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTable } from "react-table";
import ReactTable from "react-table-v6";
import { convertBengaliToEnglishNumber } from "../PDF/InvoiceDef";
import AutoSuggestInput from "@/common/AutoInputSuggest";

const BillFormDetails = (props) => {
  const { data, setData, aditionalInfo, setAditionalInfo, setSuggestionData } =
    props;

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
      }
    };

  const renderEditable = (cellInfo, fixed) => {
    const cellValue = data[cellInfo.index][cellInfo.column.id];

    return (
      <>
        <input
          text-center
          className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
            cellInfo.column.id == "goodsName" ||
            cellInfo.column.id == "totalAmount"
              ? "text-left"
              : "text-center"
          }`}
          name="input"
          type={
            cellInfo.column.id == "ctn" ||
            cellInfo.column.id == "totalAmount" ||
            cellInfo.column.id == "goodsName"
              ? "text"
              : "number"
          }
          onKeyDown={handleKeyDown}
          onChange={(e) => handleCellRenderChange(cellInfo, e.target.value)}
          value={
            cellInfo.column.id == "totalAmount"
              ? convertBengaliToEnglishNumber(
                  Number(Number(cellValue || 0).toFixed(0)).toLocaleString("bn")
                )
              : cellValue
          }
          readOnly={cellInfo.column.id == "totalAmount"}
        />
        {/* {cellInfo.column.id === "goodsName" ? (
          <AutoSuggestInput handleCellRenderChange={handleCellRenderChange} cellInfo={cellInfo} setSuggestionData={setSuggestionData}/>
        ) : (
          <input
          text-center
            className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${cellInfo.column.id == "goodsName" || cellInfo.column.id == "totalAmount" ? "text-left" : "text-center"}`}
            name="input"
            type={cellInfo.column.id == "ctn" || cellInfo.column.id == "totalAmount" || cellInfo.column.id == "goodsName" ? "text" : "number"}
            onChange={(e) => handleCellRenderChange(cellInfo, e.target.value)}
            value={
              cellInfo.column.id == "totalAmount"
                ? convertBengaliToEnglishNumber(
                    Number(Number(cellValue  || 0).toFixed(0)).toLocaleString(
                      "bn"
                    )
                  )
                : cellValue
            }
            readOnly={cellInfo.column.id == "totalAmount"}
          />
        )} */}
      </>
    );
  };

  const handleCellRenderChange = (cellInfo, val) => {
    const newData = [...data];
    newData[cellInfo.index][cellInfo.column.id] = val;
    let rate = Number(newData[cellInfo.index]["rate"]);
    let kg = Number(newData[cellInfo.index]["kg"]);
    newData[cellInfo.index]["totalAmount"] = rate * kg;
    setData(newData);
  };

  const handleDelete = (original, index) => {
    let newData = [...data];
    if (index !== -1) {
      newData.splice(index, 1);
      setData(newData);
    }
  };

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const onSubmit = (val) => {
    let newData = [...data];
    const newBill = {
      goodsName: "",
      ctn: "",
      kg: "",
      rate: "",
    };
    newData.push(newBill);
    setData(newData);
  };

  useEffect(() => {
    if (data?.length < 1) {
      const newBill = {
        goodsName: "",
        ctn: 0,
        kg: 0,
        rate: 0,
      };
      setData([{ ...newBill }]);
    }
  }, []);

  const handleAditionalInfo = (val, type) => {
    setAditionalInfo({
      ...aditionalInfo,
      [type]: val,
    });
  };
  const netTotalAmount = (data) => {
    return sumBy(data, (val) => Number(val?.totalAmount || 0));
  };
  // const netTotalAmount = (data) => {
  //   return convertBengaliToEnglishNumber(
  //     sumBy(data, (val) => Number(val?.totalAmount || 0)).toLocaleString("bn", {
  //       minimumFractionDigits: 2,
  //     })
  //   );
  // };
  const convertTotalAmount = (val) => {
    return convertBengaliToEnglishNumber(
      val.toLocaleString("bn", {
        minimumFractionDigits: 2,
      })
    );
  };

  return (
    <div className="md:w-full mx-auto border border-slate-950 mt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="text-black">
        <ReactTable
          data={data}
          columns={[
            {
              Header: "SL",
              accessor: "sl",
              Cell: (info) => (
                <p className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                  {info?.index + 1}
                </p>
              ),
              Footer: (row) => (
                <div className={"text-center"}>
                  <button
                    type="submit"
                    className="inline-flex items-center px-1.5 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              ),
              width: 60,
            },
            {
              Header: "GOODS NAME",
              accessor: "goodsName",
              Cell: renderEditable,
              Footer: (row) => (
                <div className={" text-xl font-semibold text-left"}>
                  <span>Total</span>
                </div>
              ),
              width: 360,
            },
            {
              Header: "CTN NO",
              accessor: "ctn",
              Cell: renderEditable,
              Footer: (row) => (
                <div className={" text-xl font-semibold text-center"}>
                  <span>CTN= {row?.data?.length}</span>
                </div>
              ),
            },
            {
              Header: "KG",
              accessor: "kg",
              Cell: renderEditable,
              Footer: (row) => (
                <div className={" text-xl font-semibold text-center"}>
                  <span>
                    KG= {sumBy(row?.data, (val) => Number(val?.kg)).toFixed(2)}
                  </span>
                </div>
              ),
            },
            {
              Header: "RATE",
              accessor: "rate",
              Cell: renderEditable,
              Footer: (row) => (
                <div
                  className={" text-xl font-semibold text-center flex flex-col"}
                >
                  <span className=" border-y-2">Total</span>
                  <span>Due</span>
                  <span className=" border-y-2">Paid</span>
                  <span className=" border-b-2">Total Bill</span>
                </div>
              ),
            },
            {
              Header: "AMOUNT",
              accessor: "totalAmount",
              Cell: renderEditable,
              Footer: (row) => (
                <div className={" text-xl font-semibold text-left"}>
                  <div className="flex flex-col">
                    <span className=" border-y-2 text-left">
                      {convertTotalAmount(netTotalAmount(row?.data))}
                    </span>
                    <span>
                      <input
                        className="block w-full bg-white border focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        name="input"
                        type={"number"}
                        // onChange={(e) => handleCellRenderChange(cellInfo, e.target.value)}
                        onChange={(e) =>
                          handleAditionalInfo(e.target.value, "due")
                        }
                        defaultValue={aditionalInfo?.due}
                      />
                    </span>
                    <span>
                      <input
                        className="block w-full text-left bg-white border focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        name="input"
                        type={"number"}
                        // onChange={(e) => handleCellRenderChange(cellInfo, e.target.value)}
                        defaultValue={aditionalInfo?.paid}
                        onChange={(e) =>
                          handleAditionalInfo(e.target.value, "paid")
                        }
                      />
                    </span>
                    <span className="block w-full text-left bg-white border focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                      {convertTotalAmount(
                        Number(netTotalAmount(row?.data)) +
                          Number(aditionalInfo?.due || 0) -
                          Number(aditionalInfo?.paid || 0)
                      )}
                    </span>
                  </div>
                </div>
              ),
            },
            {
              id: "headerId",
              Header: "#",
              accessor: "#",
              Cell: (row) => (
                <div className={"text-center flex flex-col space-y-2"}>
                  <button
                    type={"button"}
                    tabIndex={-1}
                    className={
                      "inline-flex items-center px-1 py-0.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
                    }
                    onClick={() => handleDelete(row.row._original, row.index)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  {data && data?.length - 1 === row?.row?._viewIndex && (
                    <button
                      type="submit"
                      className="inline-flex items-center px-1.5 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  )}
                </div>
              ),

              className: "sticky-r",
              headerClassName: "sticky-r",
              width: 50,
            },
          ]}
          className="-striped -highlight"
          defaultPageSize={100}
          minRows={12}
          showPageJump={false}
          pageSizeOptions={[100]}
          //   showPagination={100}
          showPagination={false}
          sortable={true}
        />
      </form>
    </div>
  );
};

export default BillFormDetails;
