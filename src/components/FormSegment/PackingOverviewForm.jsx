/* eslint-disable jsx-a11y/alt-text */
import Section from "@/common/Section";
import { formartDate } from "@/common/formartDate";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DataField from "../Shared/DataField";
import InputField from "../Shared/InputField";
import SelectField from "../Shared/SelectField";
import AsyncCreatableSelect from "react-select/async-creatable";
import axios from "axios";
import Modal from "../Module/Modal";
import CustomerForm from "./CustomerForm";

const PackingOverviewForm = (props) => {
  const { editMode, setCustomerInfo, customerInfo } = props;
  const [newCustomer, setNewCustomer] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "all", defaultValues: { ...customerInfo, ...newCustomer } });

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

  const getCustomers = async (inputText, callback) => {
    const response = await axios.get(`/api/customers?search=${inputText}`);
    if (response.data?.data.length > 0) {
      callback(
        response.data?.data.map((item) => ({
          label: item.customerName,
          value: item,
        }))
      );
    }
  };

  const handleSelectChange = (newValue, actionMeta) => {
    if (actionMeta.action === "create-option") {
      // A new option was created
      setCustomerInfo({
        ...watch(),
        ...customerInfo,
        customerName: newValue?.value?.toUpperCase(),
      });
    } else {
      // Existing option(s) selected
      const { value } = newValue;
      setCustomerInfo({
        ...watch(),
        ...customerInfo,
        customerName: value?.customerName?.toUpperCase(),
        customerPhone: value?.customerPhone,
        shipmentBy: value?.shipmentBy,
        customerAddress: value?.customerAddress,
        remarks: value?.remarks,
        customerId: value?.customerId,
      });
    }
  };

  const customCreateLabel = (inputValue) => (
    <p
      onClick={() => {
        setIsOpen(true);
        setNewCustomer({ ...newCustomer, customerName: inputValue });
      }}
      className="inline-flex items-center cursor-pointer px-1 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
    >
      Add New Customer
    </p>
  );

  useEffect(() => {
    if (newCustomer) {
      setCustomerInfo({ ...newCustomer });
    }
  }, [newCustomer, setCustomerInfo, isOpen]);

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
              <p>Cell: 01335096042, 01335096043</p>
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
        <div className="bg-blue-600 text-white text-center font-semibold md:text-2xl mb-2 uppercase">
          <p>Packing List</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} c>
          <div className=" grid grid-cols-1 sm:grid-cols-3 gap-2 uppercase">
            <DataField
              label={"Customer Name"}
              value={
                <AsyncCreatableSelect
                  cacheOptions
                  loadOptions={getCustomers}
                  // defaultOptions
                  className={`uppercase z-50 block lg:w-full w-auto px-4 text-gray-700 bg-white  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                  onChange={handleSelectChange}
                  formatCreateLabel={customCreateLabel}
                  placeholder={"Enter customer name"}
                  defaultValue={customerInfo && {
                    label: customerInfo?.customerName,
                    value: customerInfo?.customerName,
                  }}
                />
                // <InputField
                //   register={register}
                //   required={true}
                //   handleInputChange={handleInputChange}
                //   name={"customerName"}
                //   placeholder={"Enter customer name"}
                // />
              }
              // className=""
            />
            <DataField
              label={"Phone"}
              value={
                <InputField
                  register={register}
                  required={true}
                  handleInputChange={handleInputChange}
                  name={"customerPhone"}
                  placeholder={"Enter Phone Number"}
                  defaultValue={customerInfo?.customerPhone}
                />
              }
            />
            {/* <DataField
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
            /> */}
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
                    {
                      name: "Air",
                      value: "AIR",
                      isSelected:
                        customerInfo?.shipmentBy?.toLowerCase() == "air",
                    },
                    {
                      name: "Sea",
                      value: "SEA",
                      isSelected:
                        customerInfo?.shipmentBy?.toLowerCase() == "sea",
                    },
                    {
                      name: "Road",
                      value: "ROAD",
                      isSelected:
                        customerInfo?.shipmentBy?.toLowerCase() == "road",
                    },
                  ]}
                  handleInputChange={handleInputChange}
                />
              }
            />
            {/* <DataField
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
            /> */}
            {/* <DataField
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
            /> */}
            <DataField
              label={"Reporting"}
              value={
                <SelectField
                  register={register}
                  defaultValue={customerInfo?.reporting || "CHINA"}
                  name={"reporting"}
                  required={true}
                  options={[
                    {
                      name: "CHINA",
                      value: "CHINA",
                      isSelected:
                        customerInfo?.reporting?.toLowerCase() == "china",
                    },
                    {
                      name: "Hongkong",
                      value: "Hongkong",
                      isSelected:
                        customerInfo?.reporting?.toLowerCase() == "hongkong",
                    },
                    {
                      name: "Chongqing",
                      value: "Chongqing",
                      isSelected:
                        customerInfo?.reporting?.toLowerCase() == "chongqing",
                    },
                    {
                      name: "South Korea",
                      value: "South Korea",
                      isSelected:
                        customerInfo?.reporting?.toLowerCase() == "south korea",
                    },
                    {
                      name: "India",
                      value: "India",
                      isSelected: customerInfo?.reporting == "India",
                    },
                  ]}
                  handleInputChange={handleInputChange}
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
                  defaultValue={customerInfo?.address}
                />
              }
            />
          </div>
        </form>
      </div>

      <Modal
        isOpen={isOpen}
        showXButton
        onClose={() => setIsOpen(false)}
        className={"max-w-5xl"}
      >
        <Modal.Title>{"Add New Customer"}</Modal.Title>
        <Modal.Content>
          <div>
            <CustomerForm
              setIsOpen={setIsOpen}
              setNewCustomer={setNewCustomer}
              newCustomer={newCustomer}
            />
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default PackingOverviewForm;
