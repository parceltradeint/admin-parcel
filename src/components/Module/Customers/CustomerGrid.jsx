import { errorAlert, successAlert } from "@/common/SweetAlert";
import { formartDate } from "@/common/formartDate";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const CustomerGrid = (props) => {
  const { data, setData, setIsOpen } = props;
  const [loading, setLoading] = useState(false)
  const handleDelete = async (index, id) => {
    let newData = [...data];
    if (index !== -1) {
      newData.splice(index, 1);
      setData(newData);
    }
    await axios
      .delete(`/api/customers?id=` + id)
      .then((res) => {
        successAlert("Successfully Deleted");
      })
      .catch((err) => {
        console.log("err", err);
        errorAlert("Something went wrong!");
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="flex cursor-pointer px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      <span>Customer ID</span>
                    </th>

                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Customer Phone
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Customer Address
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Shipment By
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      WeChat ID
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th colSpan={2} className="px-6 py-3 bg-gray-50" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.length > 0 &&
                    data?.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                          {item?.customerId}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {item?.customerName}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {item?.customerPhone}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {item?.customerAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {item?.shipmentBy}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {item?.weChatId}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {formartDate(item?.created)}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium flex gap-3 items-center">
                          <button
                            onClick={() => setIsOpen({type: true})}
                            type="button"
                            className=" bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded mt-3"
                            // onClick={() => setIsOpen(false)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className=" bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"
                            onClick={() => handleDelete(index, item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {data?.length < 1 && (
                <div className=" border-gray-400 bg-white text-center p-4 py-12 mx-auto text-black">
                  <span className="inline-flex rounded-md">
                    Results not found
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerGrid;
