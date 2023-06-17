import Section from "@/common/Section";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const OverViewFrom = (props) => {
  const { editMode, setCustomerInfo, customerInfo } = props;
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "all", defaultValues: { ...customerInfo } });

  const onSubmit = (data) => {
    setCustomerInfo(data);
  };

  return (
    <Section>
      
        <p className="text-center text-2xl text-gray-950 underline">
          {!editMode ? "Create New Bill" : `Edit Bill - ${editMode?.invoiceNumber}`}
          
        </p>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-primaryText text-lg">Customer Details: </p>

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
            <label className="block text-sm text-gray-800 ">
              Delivery Date
            </label>
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              defaultValue={
                editMode ? editMode?.date : new Date().toLocaleString()
              }
              {...register("deliveryDate", {
                required: true,
              })}
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
          <div className="col-span-2">
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
              <option value="By Air">By Air</option>
              <option value="By Sea">By Sea</option>
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
          <div>
            <label className="block text-sm text-gray-800 ">Reporting</label>
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              defaultValue={"China"}
              {...register("reporting", { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-800 ">Shipment No</label>
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("shipmentNo", { required: true })}
            />
          </div>
          
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Update Customer Info
        </button>
      </form>
    </Section>
  );
};

export default OverViewFrom;
