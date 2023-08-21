/* eslint-disable jsx-a11y/alt-text */
import Section from "@/common/Section";
import { formartDate } from "@/common/formartDate";
import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const OverViewFrom = (props) => {
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
    setCustomerInfo({ ...watch(), ...customerInfo, [name]: value });
  };
  return (
    <div>
      <p className="text-center text-2xl text-gray-950 underline">
        {!editMode
          ? "Create New Bill"
          : `Edit Bill - ${editMode?.invoiceNumber}`}
      </p>

      <div className="md:w-full mx-auto border border-slate-950">
        <div className="flex items-center justify-between border-b border-slate-950">
          <div className="w-[20%]">
            <Image src={"/parcel.png"} width={80} height={80} alt="parcel" />
          </div>
          <div className="w-[60%]">
            <p className="md:text-5xl text-black ml-[20%]">
              P<span className="text-red-600">arce</span>l Trade International
            </p>
          </div>
          <div className="w-[20%] flex justify-end">
            <Image src={"/24*7.png"} width={80} height={80} alt="24/7" />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[20%]">
            <Image src={"/wechat.png"} width={80} height={80} alt="wechat" />
          </div>
          <div className="w-[60%] border-l border-r border-slate-950 px-2 bg-[#555555]">
            <div className="md:text-xl text-black font-medium text-center ">
              <p>H-2553, Sayednagor, Vatara, Gulshan-2, Dhaka-1212.</p>
              <p>Cell: 01879314050, 01521584929</p>
            </div>
          </div>
          <div className="w-[20%] flex justify-end">
            <Image
              src={"/whatsapp.png"}
              width={90}
              height={90}
              alt="whatsApp"
            />
          </div>
        </div>
        <div className="bg-blue-600 text-white text-center font-semibold md:text-2xl">
          <p>Shipment Bill</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} c>
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
            <div className="flex gap-1 px-2 col-span-2 md:border-r border-b md:border-b-0 border-slate-950">
              <label
                htmlFor="shipmentBy"
                className=" flex items-center text-base text-gray-800 border-r border-slate-950 md:w-[25%] w-[30%]"
              >
                Shipment By:
              </label>
              <select
                defaultValue={customerInfo?.shipmentBy}
                name="shipmentBy"
                {...register("shipmentBy", {
                  required: true,
                  onChange: (e) => handleInputChange("shipmentBy", e.target.value)
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="">Choose a Shipment</option>
                <option value="Air">Air</option>
                <option value="Sea">Sea</option>
              </select>
            </div>

            <div className="flex gap-1 px-2 ">
              <label className="flex items-center text-base text-gray-800 border-r border-slate-950 md:w-[55%] w-[30%]">
                Reporting:
              </label>
              <select
                id="reporting"
                defaultValue={customerInfo?.reporting || "China"}
                className="block w-full px-4 py-2 text-gray-700 bg-white focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                {...register("reporting", {
                  required: true,
                  onChange: (e) => handleInputChange("reporting", e.target.value)
                })}
              >
                <option value="China">China</option>
                <option value="Hongkong">Hongkong</option>
                <option value="Chongqing">Chongqing</option>
                <option value="South-korea">South Korea</option>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-slate-950 text-lg">
            <div className="flex gap-1 px-2 col-span-2 md:border-r border-slate-950">
              <label
                htmlFor="remarks"
                className=" flex items-center text-base text-gray-800 border-r border-slate-950 md:w-[25%] w-[30%]"
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
            <div className="flex gap-1 px-2 md:border-r border-b md:border-b-0 border-slate-950">
              <label
                htmlFor="shipmentNo"
                className=" flex items-center text-base text-gray-800 border-r border-slate-950 md:w-[55%] w-[30%]"
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
          </div>
        </form>
      </div>

      {/* <p className="text-center text-2xl text-gray-950 underline">
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
      </form> */}
    </div>
  );
};

export default OverViewFrom;
