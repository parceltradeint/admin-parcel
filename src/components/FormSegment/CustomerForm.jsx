/* eslint-disable jsx-a11y/alt-text */
import { UserContext } from "@/AuthenticApp/Context/userContext";
import PlaceHolderLoading from "@/common/PlaceHolderLoading";
import Section from "@/common/Section";
import { errorAlert, successAlert } from "@/common/SweetAlert";
import { formartDate } from "@/common/formartDate";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import ShortUniqueId from "short-unique-id";
import useSound from "use-sound";

const CustomerForm = (props) => {
  const { editMode, setIsOpen, data, setData, setEditData } = props;
  const [loading, setLoading] = useState(false);
  const [saveSoundPlay] = useSound("/assets/sounds/save.mp3", { volume: 0.45 });
const {user} = useContext(UserContext)
  const { randomUUID } = new ShortUniqueId({ length: 4 });
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      ...editMode,
      ...props.newCustomer,
    },
  });

  const onSubmit = async (value) => {
    saveSoundPlay()
    setLoading(true);
    const newData = {
      customerId: value?.customerId || `PARCEL-${randomUUID()}`,
      created: new Date(),
      createdBy: value?.createdBy || user?.displayName || "",
      ...value,
    };
    if (!editMode) {
      await axios
        .post(`/api/customers`, { ...newData })
        .then((res) => {
          successAlert("Successfully Save");
          if (props.setNewCustomer) {
            props.setNewCustomer(newData);
          } else {
            setData([...data, { ...newData }]);
          }
        })
        .catch((err) => {
          errorAlert("Something went wrong!");
        })
        .finally(() => {
          setIsOpen(false);
          setLoading(false);
        });
    } else {
      delete newData?._id;
      await axios
        .patch(`/api/customers`, {
          id: editMode?._id,
          data: { ...newData },
        })
        .then((res) => {
          successAlert("Successfully Updated");
          let index = data.findIndex((obj) => obj._id === editMode?._id);
          // Updating the array with the new object
          if (index !== -1) {
            data[index] = { ...newData };
          }
          setData([...data]);
        })
        .catch((err) => {
          console.log("err", err);
          errorAlert("Something went wrong!");
        })
        .finally(() => {
          setIsOpen(false);
          setLoading(false);
          if (!props.setNewCustomer) {
            setEditData(false);
          }
        });
    }
  };

  if (loading) {
    return <PlaceHolderLoading loading={true} />;
  }
  return (
    <div>
      <p className="text-primaryText text-2xl text-center  underline">
        Customer Details:{" "}
      </p>

      <div className="md:w-full mx-auto uppercase">
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
                htmlFor="customerPhone"
                className="block text-sm text-gray-800 "
              >
                Phone Number
              </label>
              <input
                {...register("customerPhone", {
                  required: true,
                })}
                name="customerPhone"
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
                  required: false,
                })}
                name="weChatId"
                placeholder="Enter customer wechat ID"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
            <div className="">
              <label
                htmlFor="customerAddress"
                className="block text-sm text-gray-800"
              >
                Address
              </label>
              <input
                {...register("customerAddress", {
                  required: false,
                })}
                name="customerAddress"
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
                defaultValue={editMode?.shipmentBy || "AIR"}
                {...register("shipmentBy", { required: false })}
                className="block w-full uppercase px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="">Choose a Shipment</option>
                <option value="AIR">AIR</option>
                <option value="SEA">SEA</option>
              </select>
            </div>

            <div>
              <label htmlFor="listed" className="block text-sm text-gray-800 ">
                Listed Customer
              </label>
              <select
                defaultValue={watch("listed")}
                {...register("listed", { required: false })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="">Choose a Type</option>
                <option value="true">YES</option>
                <option value="false">NO</option>
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

          <div className="flex gap-3 items-center mt-3">
            <button
              type="button"
              className=" bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"
              onClick={() => {
                setIsOpen(false);
                if (!props.setNewCustomer) {
                  setEditData(false);
                }
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
