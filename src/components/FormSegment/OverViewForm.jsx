/* eslint-disable jsx-a11y/alt-text */
import Section from "@/common/Section";
import { formartDate } from "@/common/formartDate";
import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import DataField from "../Shared/DataField";

const OverViewForm = (props) => {
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
        <div className="bg-primaryBg text-white text-center font-semibold md:text-2xl mb-2">
          <p>Shipment Bill</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} c>
          <div className=" grid grid-cols-1 sm:grid-cols-3 gap-2">
            <DataField
              label={"Customer Name"}
              value={
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
              }
              // className=""
            />
            <DataField
              label={"Phone"}
              value={
                <input
                  {...register("phone", {
                    required: true,
                  })}
                  name="phone"
                  placeholder="Enter Phone Number"
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="block w-full px-4 py-2 text-gray-700 bg-white  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              }
            />
            <DataField
              label={"Delivery Date"}
              value={
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
              }
            />
            <DataField
              label={"Shipment No"}
              value={
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
              }
            />
            <DataField
              label={"Shipment By"}
              value={
                <select
                  defaultValue={customerInfo?.shipmentBy}
                  name="shipmentBy"
                  {...register("shipmentBy", {
                    required: true,
                    onChange: (e) =>
                      handleInputChange("shipmentBy", e.target.value),
                  })}
                  className="block w-full px-4 py-2 text-gray-700 bg-white focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="">Choose a Shipment</option>
                  <option value="Air">Air</option>
                  <option value="Sea">Sea</option>
                </select>
              }
            />
            <DataField
              label={"Reporting"}
              value={
                <select
                  id="reporting"
                  defaultValue={customerInfo?.reporting || "China"}
                  className="block w-full px-4 py-2 text-gray-700 bg-white focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  {...register("reporting", {
                    required: true,
                    onChange: (e) =>
                      handleInputChange("reporting", e.target.value),
                  })}
                >
                  <option value="China">China</option>
                  <option value="Hongkong">Hongkong</option>
                  <option value="Chongqing">Chongqing</option>
                  <option value="South-korea">South Korea</option>
                </select>
              }
            />
            <DataField
              label={"Address"}
              value={
                <input
                  {...register("address", {
                    required: true,
                  })}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  name="address"
                  placeholder="Enter address"
                  className="block w-full px-4 py-2 text-gray-700 bg-white  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              }
              // className={"col-span-2"}
            />
            <DataField
              label={"Status"}
              value={
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
              }
            />
            <DataField
              label={"Remarks"}
              value={
                <input
                  {...register("remarks", {
                    required: true,
                  })}
                  name="remarks"
                  onChange={(e) => handleInputChange("remarks", e.target.value)}
                  placeholder="Enter remarks"
                  className="block w-full px-4 py-2 text-gray-700 bg-white focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OverViewForm;
