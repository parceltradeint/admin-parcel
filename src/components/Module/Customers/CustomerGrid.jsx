import { errorAlert, successAlert } from "@/common/SweetAlert";
import { formartDate } from "@/common/formartDate";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import ReactTable from "react-table-v6";
import useSound from "use-sound";

const CustomerGrid = (props) => {
  const { data, setData, setIsOpen, setEditData } = props;
  const [loading, setLoading] = useState(false);
  const [deleteSoundPlay] = useSound("/assets/sounds/deleted.mp3", {
    volume: 2,
  });

  const handleDelete = async (index, row) => {
    console.log("index", index);
    deleteSoundPlay();
    errorAlert(
      `Are you want to delete - ${row.customerName}-(${row.customerId})?`
    ).then(async (res) => {
      if (res.isConfirmed) {
        let newData = [...data];
        if (index !== -1) {
          newData.splice(index, 1);
          setData(newData);
        }
        await axios
          .delete(`/api/customers?id=` + row._id)
          .then((res) => {
            successAlert("Successfully Deleted");
          })
          .catch((err) => {
            console.log("err", err);
            errorAlert("Something went wrong!");
          });
      }
    });
  };

  return (
    <ReactTable
      data={data}
      columns={[
        {
          Header: "SL",
          accessor: "SL",
          Cell: (row) => <p>{row?.viewIndex + 1}</p>,
        },
        {
          Header: "USER ID",
          accessor: "customerId",
        },
        {
          Header: "Name",
          accessor: "customerName",
        },
        {
          Header: "Phone",
          accessor: "customerPhone",
        },
        {
          Header: "Address",
          accessor: "customerAddress",
        },
        {
          Header: "Shipment By",
          accessor: "shipmentBy",
        },
        // {
        //   Header: "WeChat Id",
        //   accessor: "weChatId",
        // },
        {
          Header: "Created",
          accessor: "created",
          Cell: ({ row }) => <p>{formartDate(row?.created)}</p>,
        },
        {
          Header: "Created By",
          accessor: "createdBy",
          Cell: ({ row }) => <p>{row?.createdBy}</p>,
        },
        {
          Header: "Action",
          accessor: "##",
          Cell: ({ row }) => (
            <div className={"text-center flex space-x-2"}>
              <button
                onClick={() => {
                  setIsOpen(true);
                  setEditData({ ...row?._original });
                }}
                type="button"
                className=" bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
                // onClick={() => setIsOpen(false)}
              >
                View
              </button>
              <button
                type="button"
                className=" bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(row._index, row?._original)}
              >
                Delete
              </button>
            </div>
          ),
        },
      ]}
      className="-striped -highlight text-left overflow-auto w-full"
      defaultPageSize={300}
      minRows={12}
      showPageJump={false}
      pageSizeOptions={[300, 350, 400, 500]}
      showPagination={true}
      // showPagination={false}
      sortable={true}
    />
  );
};

export default CustomerGrid;
