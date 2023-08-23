/* eslint-disable jsx-a11y/alt-text */
import Section from "@/common/Section";
import { formartDate } from "@/common/formartDate";
import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import DataField from "../Shared/DataField";
import InputField from "../Shared/InputField";
import SelectField from "../Shared/SelectField";

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

      <div className="md:w-full mx-auto border border-black">
        <div className="flex items-center justify-between border-b border-black">
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
          <div className="w-[60%] border-l border-r border-black px-2 bg-[#555555]">
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
        <div className="bg-primaryBg text-white text-center font-semibold md:text-2xl mb-2 uppercase">
          <p>Shipment Bill</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} c>
          <div className=" grid grid-cols-1 sm:grid-cols-3 gap-2 uppercase">
            <DataField
              label={"Customer Name"}
              value={
                <InputField
                  register={register}
                  required={true}
                  handleInputChange={handleInputChange}
                  name={"customerName"}
                  placeholder={"Enter customer name"}
                />
              }
            />
            <DataField
              label={"Phone"}
              value={
                <InputField
                  register={register}
                  required={true}
                  handleInputChange={handleInputChange}
                  name={"phone"}
                  placeholder={"Enter Phone Number"}
                />
              }
            />
            <DataField
              label={"Delivery Date"}
              value={
                <InputField
                  register={register}
                  required={true}
                  handleInputChange={handleInputChange}
                  name={"deliveryDate"}
                  readOnly={true}
                  defaultValue={
                    editMode
                      ? formartDate(editMode?.date)
                      : formartDate(new Date())
                  }
                />
              }
            />
            <DataField
              label={"Shipment No"}
              value={
                <InputField
                  register={register}
                  required={true}
                  handleInputChange={handleInputChange}
                  name={"shipmentNo"}
                  placeholder={"Enter Shipment No"}
                />
              }
            />
            <DataField
              label={"Shipment By"}
              value={
                <SelectField
                  register={register}
                  defaultValue={customerInfo?.shipmentBy}
                  name={"shipmentBy"}
                  required={true}
                  options={[
                    { name: "Choose a Shipment", value: "" },
                    { name: "Air", value: "Air" },
                    { name: "Sea", value: "Sea" },
                    { name: "Road", value: "Road" },
                  ]}
                  handleInputChange={handleInputChange}
                />
              }
            />
            <DataField
              label={"Reporting"}
              value={
                <SelectField
                  register={register}
                  defaultValue={customerInfo?.reporting || "CHINA"}
                  name={"reporting"}
                  required={true}
                  options={[
                    { name: "CHINA", value: "CHINA" },
                    { name: "Hongkong", value: "Hongkong" },
                    { name: "Chongqing", value: "Chongqing" },
                    { name: "South-korea", value: "South-korea" },
                  ]}
                  handleInputChange={handleInputChange}
                />
              }
            />
            <DataField
              label={"Address"}
              value={
                <InputField
                  register={register}
                  required={true}
                  handleInputChange={handleInputChange}
                  name={"address"}
                  placeholder={"Enter address"}
                />
              }
              // className={"col-span-2"}
            />
            <DataField
              label={"Status"}
              value={
                <InputField
                  register={register}
                  required={true}
                  handleInputChange={handleInputChange}
                  name={"status"}
                  defaultValue={"Dhaka Office"}
                  placeholder="Enter Status"
                />
              }
            />
            <DataField
              label={"Remarks"}
              value={
                <InputField
                  register={register}
                  required={false}
                  handleInputChange={handleInputChange}
                  name={"remarks"}
                  placeholder="Enter remarks"
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
