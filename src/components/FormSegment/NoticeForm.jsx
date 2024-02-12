import React from "react";
import Modal from "../Module/Modal";
import DataField from "../Shared/DataField";
import InputField from "../Shared/InputField";
import { useForm } from "react-hook-form";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { generateNoticePdf } from "../PDF/generateNoticePdf";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function NoticeForm({ isNoticeOpen, setIsNoticeOpen }) {
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });
  const onSubmit = (data) => {
    generateNoticePdf(data.notice || "");
    console.log("data", data);
  };

  return (
    <Modal
      isOpen={isNoticeOpen}
      showXButton
      onClose={() => setIsNoticeOpen(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Title>Notice Board</Modal.Title>
        <Modal.Content>
          <div>
            <div className="flex w-full items-center justify-between bg-primaryBg px-4 py-2 text-sm text-white">
              <p className="m-0 p-0 uppercase">Enter your Notice</p>
              <span className="m-0 p-0">:</span>
            </div>
            <textarea
              {...register("notice", {
                required: true,
              })}
              name={"notice"}
              placeholder={"Typing Notice"}
              className={`uppercase block p-5 mt-3 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 `}
              type="textarea"
              rows="4"
            />
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex gap-3 items-center mt-3">
            <button
              type="button"
              className=" bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"
              onClick={() => {
                setIsNoticeOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
            >
              View Notice
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
