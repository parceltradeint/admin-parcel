import { sumBy } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { convertTotalAmount } from "../PDF/InvoiceDef";

const ShipmentBillGrid = (props) => {
  const { data, type } = props;
  const router = useRouter();
  const calculationDueBill = (item) => {
    if (item.totalAmount) {
      return Number(item.totalAmount).toFixed(2);
    } else {
      let total =
        sumBy(item.data, (v) => Number(v.totalAmount || 0)) +
        Number(item?.rmb?.qty || 0) * Number(item?.rmb?.rate || 0);
      return total.toFixed(2);
    }
  };
  return (
    <div>
      <div className="flex flex-col uppercase">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="flex cursor-pointer px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                      <span>SL</span>
                    </th>

                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                      Delivery Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                      Shipment No
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                      Shipment By
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                      Total Kg
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                      Total Bill
                    </th>
                    <th colSpan={2} className="px-6 py-3 bg-gray-50" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.length > 0 &&
                    data?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                          {item?.customerName}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                          {item?.deliveryDate}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                          {item?.shipmentNo}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                          {item?.shipmentBy}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                          {Number(item?.totalKg).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                          {convertTotalAmount(Number(calculationDueBill(item)))}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                          <Link
                            as={
                              "/bill/edit/" +
                              item?._id +
                              "/?type=" +
                              type +
                              `/?year=${router.query?.year}`
                            }
                            href={{
                              pathname: "/bill/edit/[slug]",
                              query: {
                                id: item?._id,
                                type: type,
                              },
                            }}
                          >
                            <p
                              // type="button"
                              className="inline-flex items-center px-3 py-2.5 border border-transparent text-sm leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                            >
                              View
                            </p>
                          </Link>
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

export default ShipmentBillGrid;
