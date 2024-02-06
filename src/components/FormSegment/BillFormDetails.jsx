import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sumBy } from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactTable from "react-table-v6";
import { convertBengaliToEnglishNumber } from "../PDF/InvoiceDef";
import NumberFormat from "react-number-format";
import useSound from "use-sound";

const BillFormDetails = (props) => {
  const { data, setData, aditionalInfo, setAditionalInfo, type } = props;
  const [deleteItemsSoundPlay] = useSound("/assets/sounds/delete-item.mp3", {"volume": 0.25});
  const [addItemsSoundPlay] = useSound("/assets/sounds/save.mp3", {"volume": 0.25});

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };

  const renderEditable = (cellInfo, fixed) => {
    const cellValue = data[cellInfo.index][cellInfo.column.id];

    return (
      <>
        <input
          className={`uppercase block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
            cellInfo.column.id == "goodsName"
              ? "text-left"
              : cellInfo.column.id == "totalAmount"
              ? "text-right"
              : "text-center"
          }`}
          name="input"
          step={"any"}
          // type={
          //   cellInfo.column.id == "ctn" ||
          //   cellInfo.column.id == "totalAmount" ||
          //   cellInfo.column.id == "goodsName"
          //     ? "text"
          //     : "number"
          // }
          onKeyDown={handleKeyDown}
          onChange={(e) =>
            handleCellRenderChange(cellInfo, e.target.value.toUpperCase())
          }
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

  const renderEditMark = (cellInfo, type) => {
    const cellValue = data[cellInfo.index]?.[cellInfo.column.id];
    return (
      <>
        <input
          className={`flex items-center ${type == "all" ? "mt-1":"mt-5"} cursor-pointer ml-2 text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 mark-box`}
          type="checkbox"
          onChange={(e) =>
            handleCellMarkChange(cellInfo, e.target.checked, type)
          }
          defaultChecked={cellValue || false}
        />
      </>
    );
  };
  const handleCellMarkChange = (cellInfo, val, type) => {
    const newData = [...data];
    if (type === "all") {
      const markDatas = newData.map((item) => ({ ...item, mark: val }));
      const rowCheckboxes = document.querySelectorAll('.mark-box');
      rowCheckboxes.forEach(checkbox => {
        checkbox.checked = val;
      });
      setData(markDatas);
    } else {
      newData[cellInfo.index][cellInfo.column.id] = val;
      setData(newData);
    }
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
    deleteItemsSoundPlay()
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
    addItemsSoundPlay()
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
        ctn: "",
        kg: "",
        rate: "",
      };
      setData([{ ...newBill }]);
    }
  }, [data?.length, setData]);

  const handleAditionalInfo = (val, type) => {
    setAditionalInfo({
      ...aditionalInfo,
      [type]: val,
    });
  };
  const netTotalAmount = (data) => {
    return (
      sumBy(data, (val) => Number(val?.totalAmount || 0)) +
      (Number(aditionalInfo?.rmb?.qty) * Number(aditionalInfo?.rmb?.rate) || 0)
    );
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

  const handleRMBChange = (val, type) => {
    const newAditionalInfo = { ...aditionalInfo };
    if (type === "qty") {
      newAditionalInfo["rmb"] = {
        ...newAditionalInfo["rmb"],
        qty: val,
      };
    }
    if (type === "rate") {
      newAditionalInfo["rmb"] = {
        ...newAditionalInfo["rmb"],
        rate: val,
      };
    }
    if (type === "des") {
      newAditionalInfo["rmb"] = {
        ...newAditionalInfo["rmb"],
        des: val,
      };
    }
    setAditionalInfo({
      ...newAditionalInfo,
    });
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
                <p className="uppercase block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                  {info?.viewIndex + 1}
                </p>
              ),
              Footer: (row) => (
                <div className={"text-center"}>
                  <button
                    type="submit"
                    className="inline-flex items-center px-2 py-2 mt-10 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
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
                <div
                  className={
                    "uppercase text-xl font-semibold text-left flex flex-col"
                  }
                >
                  <input
                    className={`py-1 px-1 uppercase mb-2 block w-full text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                    name="input"
                    step={"any"}
                    onChange={(e) =>
                      handleRMBChange(e.target.value.toUpperCase(), "des")
                    }
                    // value={aditionalInfo?.rmb?.des || "REPACKING CHARGE"}
                    defaultValue={aditionalInfo?.rmb?.des || "REPACKING CHARGE"}
                  />
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
                <div
                  className={
                    "uppercase text-xl font-semibold text-center flex flex-col"
                  }
                >
                  <span>
                    <input
                      className={`py-1 px-1 mb-2 invisible uppercase block w-full text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                      name="input"
                      step={"any"}
                    />
                  </span>
                  <span>CTN= {row?.data?.length}</span>
                </div>
              ),
            },
            {
              Header: "KG",
              accessor: "kg",
              // Cell: renderEditable,
              Cell: (row) => (
                <NumberFormat
                  thousandSeparator={true}
                  onValueChange={(values, sourceInfo) => {
                    const { formattedValue, value } = values;
                    handleCellRenderChange(row, value);
                  }}
                  className={`text-center block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                  value={row?.original?.kg}
                  inputMode="numeric"
                  decimalScale={2}
                  fixedDecimalScale={2}
                />
              ),
              Footer: (row) => (
                <div
                  className={" text-xl font-semibold text-center flex flex-col"}
                >
                  <span>
                    {/* <input
                      className={`py-1 px-1 text-center mb-2 uppercase block w-full text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                      name="input"
                      step={"any"}
                      onChange={(e) => handleRMBChange(e.target.value, "qty")}
                      value={aditionalInfo?.rmb?.qty}
                    /> */}
                    <NumberFormat
                      thousandSeparator={true}
                      onValueChange={(values, sourceInfo) => {
                        const { formattedValue, value } = values;
                        handleRMBChange(value, "qty");
                      }}
                      className="text-center mb-2 block w-full bg-white border focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={aditionalInfo?.rmb?.qty}
                    />
                  </span>
                  <span className="mt-2">
                    KG= {sumBy(row?.data, (val) => Number(val?.kg)).toFixed(2)}
                  </span>
                </div>
              ),
            },
            {
              Header: "RATE",
              accessor: "rate",
              // Cell: renderEditable,
              show: type === "packing" ? false : true,
              Cell: (row) => (
                <NumberFormat
                  thousandSeparator={true}
                  onValueChange={(values, sourceInfo) => {
                    const { formattedValue, value } = values;
                    handleCellRenderChange(row, value);
                  }}
                  className={` text-center block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                  value={row?.original?.rate}
                  inputMode="numeric"
                  // decimalScale={0}
                  // fixedDecimalScale={2}
                />
              ),
              Footer: (row) => (
                <div
                  className={
                    "uppercase text-xl font-semibold text-left flex flex-col"
                  }
                >
                  <span className=" border-y-2">
                    <NumberFormat
                      thousandSeparator={true}
                      onValueChange={(values, sourceInfo) => {
                        const { formattedValue, value } = values;
                        handleRMBChange(value, "rate");
                      }}
                      className="text-center mb-2 block w-full bg-white border focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={aditionalInfo?.rmb?.rate}
                      // inputMode="numeric"
                    />
                    {/* <input
                      className={`py-1 px-1 text-center mb-2 uppercase block w-full text-gray-700 bg-white border rounded-md !appearance-none focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                      name="input"
                      step={"any"}
                      onChange={(e) => handleRMBChange(e.target.value, "rate")}
                      value={aditionalInfo?.rmb?.rate}
                    /> */}
                  </span>
                  <span className=" border-y-2 mt-4">Total</span>
                  <span className="text-red-600">Due</span>
                  <span className=" border-y-2 text-green-600">ADVANCE</span>
                  <span className=" ">Total Bill</span>
                </div>
              ),
            },
            {
              Header: "AMOUNT",
              accessor: "totalAmount",
              show: type === "packing" ? false : true,
              Cell: renderEditable,
              Footer: (row) => (
                <div className={" text-xl font-semibold text-right "}>
                  <div className="flex flex-col">
                    <span className=" border-y-2 text-right pb-1 mb-2">
                      <NumberFormat
                        thousandSeparator={true}
                        className="text-right font-semibold block w-full bg-white border focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={convertTotalAmount(
                          Number(aditionalInfo?.rmb?.qty) *
                            Number(aditionalInfo?.rmb?.rate) || 0
                        )}
                        disabled
                        // inputMode="numeric"
                      />
                    </span>
                    <span className=" border-y-2 text-right">
                      <NumberFormat
                        thousandSeparator={true}
                        className="text-right font-semibold block w-full bg-white border focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={convertTotalAmount(netTotalAmount(row?.data))}
                        disabled
                        // inputMode="numeric"
                      />
                      {/* {convertTotalAmount(netTotalAmount(row?.data))} */}
                    </span>
                    <span>
                      <NumberFormat
                        thousandSeparator={true}
                        onValueChange={(values, sourceInfo) => {
                          const { formattedValue, value } = values;
                          handleAditionalInfo(value, "due");
                        }}
                        className="text-right block w-full bg-white text-red-600 border focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={aditionalInfo?.due}
                        inputMode="numeric"
                        disabled
                      />
                      {/* <input
                        className="text-right block w-full bg-white border focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        name="input"
                        type={"number"}
                        // onChange={(e) => handleCellRenderChange(cellInfo, e.target.value)}
                        onChange={(e) =>
                          handleAditionalInfo(e.target.value, "due")
                        }
                        defaultValue={aditionalInfo?.due}
                      /> */}
                    </span>
                    <span>
                      <NumberFormat
                        thousandSeparator={true}
                        onValueChange={(values, sourceInfo) => {
                          const { formattedValue, value } = values;
                          handleAditionalInfo(value, "paid");
                        }}
                        className="text-right block w-full bg-white text-green-600 border focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={aditionalInfo.paid}
                        disabled
                        // inputMode="numeric"
                      />
                      {/* <input
                        className="block w-full text-right bg-white border focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        name="input"
                        type={"number"}
                        // onChange={(e) => handleCellRenderChange(cellInfo, e.target.value)}
                        defaultValue={aditionalInfo?.paid}
                        onChange={(e) =>
                          handleAditionalInfo(e.target.value, "paid")
                        }
                      /> */}
                    </span>
                    <span className="block w-full text-right bg-white border focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
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
              Header: "Status",
              accessor: "status",
              Cell: (row) => (
                <span
                  className={`${
                    row.original.mark == true
                      ? "bg-green-100 text-green-800"
                      : " bg-red-100 text-red-800"
                  } uppercase block w-full px-2 py-1 mt-3 border rounded-md text-sm font-medium`}
                >
                  {row.original.mark == true ? "Done" : "Pending"}
                </span>
              ),
              width: 90,
              show: type === "customer" || type === "outbound" ? true : false,
            },
            {
              Header: (row) => renderEditMark(row, "all"),
              accessor: "mark",
              Cell: renderEditMark,
              width: 40,
              show: type === "customer" ? true : false,
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
          pageSizeOptions={[100, 150, 200, 250, 300]}
          showPagination={true}
          // showPagination={false}
          sortable={true}
        />
      </form>
    </div>
  );
};

export default BillFormDetails;
