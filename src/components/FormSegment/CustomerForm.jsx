/* eslint-disable jsx-a11y/alt-text */
import Section from "@/common/Section";
import { formartDate } from "@/common/formartDate";
import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const CustomerForm = (props) => {
  const { editMode, setCustomerInfo, customerInfo } = props;
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "all", defaultValues: { ...customerInfo } });

  const onSubmit = (data) => {
    // setCustomerInfo(data);
  };
  // useEffect(() => {
  //   setCustomerInfo({ ...getValues(), ...watch() });
  //   console.log("customer", { ...getValues(), ...watch() });
  // }, [getValues, setCustomerInfo, watch]);

  const handleInputChange = (name, value) => {
    console.log(name, value);
    setCustomerInfo({ ...watch(), ...customerInfo, [name]: value });
  };

  return (
    <div>
              <p className="text-primaryText text-2xl text-center  underline">Customer Details: </p>


      <div className="md:w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm text-gray-800 "
            >
              Customer Name
            </label>
            <input
              {...register("customerName", {
                required: true,
              })}
              name="customerName"
              placeholder="Enter your customer name"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm text-gray-800 "
            >
              Phone Number
            </label>
            <input
              {...register("phoneNumber", {
                required: true,
              })}
              name="phoneNumber"
              placeholder="Enter phone number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label
              htmlFor="weChatId"
              className="block text-sm text-gray-800 "
            >
              Customer Wechat ID
            </label>
            <input
              {...register("weChatId", {
                required: true,
              })}
              name="weChatId"
              placeholder="Enter customer wechat ID"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
          <div className="">
            <label htmlFor="address" className="block text-sm text-gray-800">
              Address
            </label>
            <input
              {...register("address", {
                required: true,
              })}
              name="address"
              placeholder="Enter customer address"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div>
            <label
              htmlFor="shipmentBy"
              className="block text-sm text-gray-800 "
            >
              Shipment By
            </label>
            <select
              id="shipmentBy"
              defaultValue={"By Air"}
              {...register("shipmentBy", { required: true })}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            >
              <option value="">Choose a Shipment</option>
              <option value="By Air">Air</option>
              <option value="By Sea">Sea</option>
            </select>
          </div>
          <div className="">
            <label htmlFor="remarks" className="block text-sm text-gray-800">
              Remarks
            </label>
            <input
              {...register("remarks", { required: false })}
              name="remarks"
              placeholder="Enter your remarks"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Save
        </button>
      </form>

        {/* <form onSubmit={handleSubmit(onSubmit)} c>
          <div className="grid grid-cols-1 mt-4 sm:grid-cols-3 border-t border-slate-950 text-lg">
            <div className="flex gap-1 px-2 col-span-2 md:border-r border-b md:border-b-0 border-slate-950">
              <label
                htmlFor="customerName"
                className=" flex items-center text-base text-gray-800 border-r border-slate-950 md:w-[25%] w-[30%]"
              >
                Customer Name:
              </label>
              <input
                {...register("customerName", {
                  required: true,
                })}
                name="customerName"
                placeholder="Enter your customer name"
                onChange={(e) =>
                  handleInputChange("customerName", e.target.value)
                }
                className="block w-full px-4 py-2 text-gray-700 bg-white  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="flex gap-1 px-2">
              <label className="flex items-center text-base text-gray-800 border-r border-slate-950 md:w-[55%] w-[30%]">
                Delivery Date:
              </label>
              <input
                className="block w-full px-4 py-2 text-gray-700 bg-white  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                defaultValue={
                  editMode
                    ? formartDate(editMode?.date)
                    : formartDate(new Date())
                }
                {...register("deliveryDate", {
                  required: true,
                })}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-slate-950 text-lg">
            <div className="flex gap-1 px-2  md:border-r border-b md:border-b-0 border-slate-950">
              <label
                htmlFor="shipmentNo"
                className=" flex items-center text-base text-gray-800 border-r border-slate-950 md:w-[71.5%] w-[30%]"
              >
                Shipment No:
              </label>
              <input
                {...register("shipmentNo", {
                  required: true,
                })}
                name="shipmentNo"
                placeholder="Enter ShipmentNo"
                onChange={(e) =>
                  handleInputChange("shipmentNo", e.target.value)
                }
                className="block w-full px-4 py-2 text-gray-700 bg-white  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="flex gap-1 px-2 md:border-r border-b md:border-b-0 border-slate-950">
              <label
                htmlFor="shipmentBy"
                className=" flex items-center text-base text-gray-800 border-r border-slate-950 md:w-[25%] w-[30%]"
              >
                Shipment By:
              </label>
              <select
                defaultValue={customerInfo?.shipmentBy}
                name="shipmentBy"
                onChange={(e) =>
                  handleInputChange("shipmentBy", e.target.value)
                }
                // {...register("shipmentBy", { required: true })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="">Choose a Shipment</option>
                <option value="By Air">By Air</option>
                <option value="By Sea">By Sea</option>
              </select>
            </div>
            <div className="flex gap-1 px-2 ">
              <label className="flex items-center text-base text-gray-800 border-r border-slate-950 md:w-[55%] w-[30%]">
                Reporting:
              </label>
              <select
                id="reporting"
                defaultValue={"china"}
                onChange={(e) => handleInputChange("reporting", e.target.value)}
                // {...register("reporting", { required: true })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="">Choose a Reporting</option>
                <option value="china">China</option>
                <option value="hongkong">Hongkong</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-slate-950 text-lg">
            <div className="flex gap-1 px-2 col-span-2 md:border-r border-b md:border-b-0 border-slate-950">
              <label
                htmlFor="address"
                className=" flex items-center text-base text-gray-800 border-r border-slate-950 md:w-[25%] w-[30%]"
              >
                Address:
              </label>
              <input
                {...register("address", {
                  required: true,
                })}
                onChange={(e) => handleInputChange("address", e.target.value)}
                name="address"
                placeholder="Enter address"
                className="block w-full px-4 py-2 text-gray-700 bg-white  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="flex gap-1 px-2 ">
              <label className="flex items-center text-base text-gray-800 border-r border-slate-950 md:w-[55%] w-[30%]">
                Status:
              </label>
              <input
                {...register("status", {
                  required: true,
                })}
                name="status"
                onChange={(e) => handleInputChange("status", e.target.value)}
                defaultValue={"Dhaka Office"}
                placeholder="Enter your customer name"
                className="block w-full px-4 py-2 text-gray-700 bg-white focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 border-t border-slate-950 text-lg">
            <div className="flex gap-1 px-2 col-span-2 border-slate-950">
              <label
                htmlFor="remarks"
                className=" flex items-center text-base text-gray-800 border-r border-slate-950 md:w-[15.2%] w-[30%]"
              >
                Remarks:
              </label>
              <input
                {...register("remarks", {
                  required: true,
                })}
                name="remarks"
                onChange={(e) => handleInputChange("remarks", e.target.value)}
                placeholder="Enter remarks"
                className="block w-full px-4 py-2 text-gray-700 bg-white focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default CustomerForm;
