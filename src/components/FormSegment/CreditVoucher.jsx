import React from "react";
import Modal from "../Module/Modal";
import DataField from "../Shared/DataField";
import InputField from "../Shared/InputField";
import { useForm } from "react-hook-form";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { generateNoticePdf } from "../PDF/generateNoticePdf";
import ShortUniqueId from "short-unique-id";
import { generateCreditVoucher } from "../PDF/creditVoucher";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function CreditVoucher({ isOpen, setIsOpen }) {
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });
  const { randomUUID } = new ShortUniqueId({ length: 8 });
  const onSubmit = (data) => {
    const trxId = randomUUID()
    generateCreditVoucher({ ...data, trxId });
    setIsOpen(false);
  };

  function getFormattedDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = `0${now.getMonth() + 1}`.slice(-2);
    const day = `0${now.getDate()}`.slice(-2);
    const hours = `0${now.getHours()}`.slice(-2);
    const minutes = `0${now.getMinutes()}`.slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return (
    <Modal isOpen={isOpen} showXButton onClose={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Title>Credit Voucher Form</Modal.Title>
        <Modal.Content>
          <div className=" grid grid-cols-3 justify-center space-x-3 gap-3">
            <div>
              <div className="flex w-full items-center justify-between bg-primaryBg px-4 py-1 text-sm text-white">
                <p className="m-0 p-0 uppercase">Enter From</p>
                <span className="m-0 p-0">:</span>
              </div>
              <input
                {...register("from", {
                  required: true,
                })}
                name={"from"}
                placeholder={"Enter From"}
                className={`uppercase block p-2 mt-3 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 `}
                type="text"
              />
            </div>
            <div>
              <div className="flex w-full items-center justify-between bg-primaryBg px-4 py-1 text-sm text-white">
                <p className="m-0 p-0 uppercase">Received By</p>
                <span className="m-0 p-0">:</span>
              </div>
              <input
                {...register("receivedBy", {
                  required: true,
                })}
                name={"receivedBy"}
                placeholder={"Enter Received By"}
                className={`uppercase block p-2 mt-3 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 `}
                type="text"
              />
            </div>
            <div>
              <div className="flex w-full items-center justify-between bg-primaryBg px-4 py-1 text-sm text-white">
                <p className="m-0 p-0 uppercase">Method</p>
                <span className="m-0 p-0">:</span>
              </div>
              <input
                {...register("method", {
                  required: true,
                })}
                name={"method"}
                placeholder={"Enter Method"}
                className={`uppercase block p-2 mt-3 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 `}
                type="text"
              />
            </div>
            <div>
              <div className="flex w-full items-center justify-between bg-primaryBg px-4 py-1 text-sm text-white">
                <p className="m-0 p-0 uppercase">Date</p>
                <span className="m-0 p-0">:</span>
              </div>
              <input
                {...register("dateTime", {
                  required: true,
                })}
                name={"dateTime"}
                placeholder={"Date"}
                className={`uppercase block p-2 mt-3 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 `}
                type="datetime-local"
                value={getFormattedDateTime()}
                // readOnly
              />
            </div>
            <div>
              <div className="flex w-full items-center justify-between bg-primaryBg px-4 py-1 text-sm text-white">
                <p className="m-0 p-0 uppercase">Amount</p>
                <span className="m-0 p-0">:</span>
              </div>
              <input
                {...register("amount", {
                  required: true,
                })}
                name={"amount"}
                placeholder={"Enter Amount"}
                className={`uppercase block p-2 mt-3 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 `}
                type="text"
              />
            </div>
            {/* <div>
              <div className="flex w-full items-center justify-between bg-primaryBg px-4 py-1 text-sm text-white">
                <p className="m-0 p-0 uppercase">Trxd Id</p>
                <span className="m-0 p-0">:</span>
              </div>
              <input
                {...register("trxdId", {
                  required: true,
                })}
                name={"trxdId"}
                placeholder={"Enter TrxdId"}
                className={`uppercase block p-2 mt-3 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 `}
                type="text"
                value={randomUUID()}
                readOnly
              />
            </div> */}
            <div>
              <div className="flex w-full items-center justify-between bg-primaryBg px-4 py-1 text-sm text-white">
                <p className="m-0 p-0 uppercase">Shipment No</p>
                <span className="m-0 p-0">:</span>
              </div>
              <input
                {...register("shipmentNo", {
                  required: true,
                })}
                name={"shipmentNo"}
                placeholder={"Enter shipment No"}
                className={`uppercase block p-2 mt-3 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 `}
                type="text"
              />
            </div>
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex gap-3 items-center mt-3">
            <button
              type="button"
              className=" bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-3"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-3"
            >
              Save & View Voucher
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
