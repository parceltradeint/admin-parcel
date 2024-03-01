import { faRefresh, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactTable from "react-table-v6";

const AllEmployees = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState({
    type: false,
    id: "",
  });
  const [page, setPage] = useState(0);
  const limit = 20;
  const [filter_data, setFilter_data] = useState("");
  const [searchInput, setSearchInput] = useState("");
  // const [data, setData] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [data, setData] = useState();
  const pagginationHandler = ({ nextSelectedPage }) => {
    if (nextSelectedPage !== undefined) {
      setPage(nextSelectedPage + 1);
    }
  };

  const handleSearch = async () => {
    setFilter_data(searchInput.trim());
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleClear = () => {
    setSearchInput("");
    setFilter_data("");
  };

  const handleLoginAsEmployee = async (uid) => {
    // console.log("cell", cell.original);
    setPageLoading(true);

    const customToken = httpsCallable(functions, "customToken");
    customToken({ uid: uid })
      .then((result) => {
        const token = result.data;
        setPageLoading(false);
        window.open(
          `https://otuljob.com/login-as-employee?auth=${token}`,
          "_blank"
        );
      })
      .catch((error) => {
        setPageLoading(false);
        errorAlert("Something went wrong!");
      });
  };

  const create_employee = (employee) => {
    setOpenUpdate({
      type: "create",
      open: true,
    });
  };

  const update_employee = (employee) => {
    setOpenUpdate({
      type: "update",
      employee,
      open: true,
    });
  };

  const deleteEmployee = async (data) => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    setPageLoading(true);
    return await axios
      .post(`/api/admin/deleteEmployee`, { ...data })
      .then((res) => {
        console.log("res delte", res);
        setData((prev) => prev.filter((item) => item.uid !== data?.uid));
        return res.data;
      })
      .catch((err) => console.log("error", err))
      .finally(() => setPageLoading(false));
  };

  const summaryData = (value) => {
    return [
      {
        name: "Name",
        value: value?.displayName || "",
      },
      {
        name: "Phone Number",
        value: value?.phone_number || "",
      },
      {
        name: "email",
        value: value?.email || "",
      },
      {
        name: "role",
        value: value?.role || "Is Employee",
      },
      {
        name: "Created Time",
        value: formartDate(value?.createdAt?._seconds * 1000, true),
      },
      {
        name: "Status",
        value: value?.status || "N/A",
      },
      {
        name: "Last Active",
        value: `${formartDate(
          value?.lastActive || Date.now(),
          true
        )} - ${timeSince(value.lastActive)}`,
      },
    ];
  };

  useEffect(() => {
    axios
      .get(`/api/admin/getEmployees`)
      .then((res) => {
        console.log("res", res);
        // return res.data;
        setData(res.data?.users);
      })
      .catch((err) => console.log("error", err));
  }, []);

  // if (pageLoading) {
  //   return <OverlayLoading />;
  // }
  // if (loading) {
  //   return <PlaceHolderLoading loading={loading} />;
  // }
  return (
    <div>
      <div className={"flex pr-8 justify-end"}>
        <div className=" flex rounded-md shadow-sm">
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={searchInput}
              className="form-input block w-full rounded-none rounded-l-md transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              placeholder={"Search"}
            />
          </div>
          <button
            onClick={handleSearch}
            className=" relative items-center px-5 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            {/* Heroicon name: sort-ascending */}

            <FontAwesomeIcon icon={faSearch} />
            {/*<span className="ml-2">Search</span>*/}
          </button>
        </div>
        <div className={"mt-1 mx-2"}>
          <button
            onClick={handleClear}
            className={
              "inline-flex items-center px-5 py-3 border border-transparent text-xs leading-4 font-medium rounded text-indigo-700 bg-indigo-300 hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
            }
            type={"button"}
          >
            Clear
          </button>
        </div>
      </div>

      <button
        // disabled={!isValid}
        type="button"
        className=" bg-primaryBg rounded-md px-3 py-1 text-white m-1"
        onClick={create_employee}
      >
        Add New User
      </button>

      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "SL",
              accessor: "sl",
              Cell: (row) => <p>{row.viewIndex + 1}</p>,
              width: 60,
              // Footer: () => <p className="text-center">Total-</p>,
            },
            {
              Header: "Name",
              accessor: "displayName",
              Cell: ({ row }) => <p>{row._original.displayName ?? "--"}</p>,
              width: 200,
              // Footer: () => <p className="text-center">Total-</p>,
            },
            {
              Header: "Number",
              accessor: "phoneNumber",
              Cell: ({ row }) => <p>{row._original.phoneNumber ?? "--"}</p>,
              // value: value?.phoneNumber || "",
            },
            {
              Header: "email",
              accessor: "email",
              // value: value?.email || "",
            },
            {
              Header: "role",
              accessor: "customClaims.role",
              Cell: ({ row }) => (
                <p>{row._original.customClaims?.role ?? "--"}</p>
              ),
              // value: value?.role || "Is Employee",
            },
            {
              Header: "Created Time",
              accessor: "metadata.creationTime",
              // Cell: ({ row }) =>
              //   formartDate(row._original?.creationTime?._seconds * 1000, true),
            },
            // {
            //   Header: "Status",
            //   accessor: "status",
            // },
            {
              Header: "Last Active",
              accessor: "metadata.lastSignInTime",
              // value: `${formartDate(
              //   value?.lastActive || Date.now(),
              //   true
              // )} - ${timeSince(value.lastActive)}`,
            },
            {
              Header: "Action",
              accessor: "#",
              Cell: ({ row }) => (
                <div className="flex md:space-x-2 justify-center md:flex-row flex-col items-center">
                  <button
                    className=" bg-primaryBg hover:opacity-75 rounded-md px-3 py-1 text-white"
                    type="button"
                    //   disabled={!isValid}
                    onClick={() => {
                      update_employee(row?._original);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className=" bg-red-600 hover:opacity-75 rounded-md px-3 py-1 text-white"
                    type="button"
                    //   disabled={!isValid}
                    onClick={() => {
                      deleteEmployee(row?._original);
                    }}
                  >
                    Delete
                  </button>
                  {/* <button
                    onClick={() => {
                      handleLoginAsEmployee(item?.uid);
                    }}
                    type="button"
                    className="btn btn-info px-3 py-0.5 btn-sm m-1"
                  >
                    Login As Employee
                  </button> */}
                </div>
              ),
            },
          ]}
          className="-striped -highlight text-center relative"
          defaultPageSize={200}
          minRows={12}
          showPageJump={false}
          pageSizeOptions={[200, 250, 300]}
          showPagination={true}
          // showPagination={false}
          sortable={true}
        />
      </div>

      {/* <div className="my-2">
        {!loading && (
          <Pagination
            currentPage={0}
            pageCount={1}
            pagginationHandler={pagginationHandler}
          />
        )}
      </div> */}

      {openUpdate?.open && (
        <Modal
          openUpdate={openUpdate}
          setOpenUpdate={setOpenUpdate}
          data={data}
          setData={setData}
          // updateEmployee={updateEmployee}
        />
      )}
    </div>
  );
};

export default AllEmployees;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "@/AuthenticApp/Context/userContext";
import { ReactTableDefaults } from "react-table-v6";
import { formartDate } from "@/common/formartDate";
import { errorAlert, successAlert } from "@/common/SweetAlert";
import { SpingSvgIcon } from "@/common/PlaceHolderLoading";

export function Modal(props) {
  let [isOpen, setIsOpen] = useState(true);
  const { user } = useContext(UserContext);
  const [pageLoading, setPageLoading] = useState(false);
  const { openUpdate, setOpenUpdate, data, setData } = props;
  const [roleUpdate, setRoleUpdate] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    watch,
  } = useForm({ mode: "onChange", defaultValues: openUpdate?.employee });
  function closeModal() {
    setIsOpen(false);
    setOpenUpdate(false);
  }
  const updateEmployee = async (data) => {
    setPageLoading(true);
    await axios
      .patch(`/api/admin/updateEmployee?uid=${data.uid}`, { ...data })
      .then((res) => {
        console.log("res", res);
        // return res.data;
      })
      .catch((err) => console.log("error", err))
      .finally(() => setPageLoading(false));
    // setPageLoading(true);
    // const update = httpsCallable(functions, "updateUser");
    // return update({ ...data })
    //   .then((result) => {
    //     return result.data;
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //     return error;
    //     // setPageLoading(false);
    //     // errorAlert("Something went wrong!");
    //   });
  };

  const createEmployee = async (data) => {
    setPageLoading(true);
    return await axios
      .post(`/api/admin/createNewEmployee`, { ...data })
      .then((res) => {
        console.log("res", res);
        return res.data;
      })
      .catch((err) => console.log("error", err))
      .finally(() => setPageLoading(false));
  };

  const onSubmit = async (data) => {
    // setPageLoading(true);
    const newData = {
      uid: data.uid,
      displayName: data.displayName,
      email: data.email,
      disabled: data.disabled,
      // phoneNumber: `+88${data?.phoneNumber}`,
      customClaims: {
        ...data?.customClaims,
        role: data.role,
        update: openUpdate?.type === "create" ? true : roleUpdate,
      },
    };

    if (watch("password")?.length >= 6) {
      newData["password"] = watch("password");
    }
    if (watch("phoneNumber")?.length >= 11) {
      newData["phoneNumber"] = `${data?.phoneNumber}`;
    }
    // if (openUpdate?.type === "create") {
    //   newData["customClaims"]["isEmployee"] = true;
    // }
    let res;
    if (openUpdate?.type === "update") {
      res = await updateEmployee(newData);
      if (res?.uid) {
        const findInx = data.findIndex((item) => item.uid === res.uid);
        data[findInx] = res;
        setData(data);
      }
    }
    if (openUpdate?.type === "create") {
      res = await createEmployee(newData);
      if (res?.uid) {
        setData([...data, { ...res }]);
      }
    }
    if (res?.uid) {
      setPageLoading(false);
      setOpenUpdate(false);
      setRoleUpdate(false);
      closeModal();
      successAlert(`Successfully ${openUpdate?.type}.`);
    } else {
      setPageLoading(false);
      setOpenUpdate(false);
      setRoleUpdate(false);
      closeModal();
      errorAlert(
        `${res?.errorInfo?.message} Please try again ${openUpdate?.type}.`
      );
    }
  };

  const changeRole = (e) => {
    if (e.target.value !== openUpdate?.employee?.customClaims?.role) {
      setRoleUpdate(true);
    }
  };

  // if (pageLoading) {
  //   return <OverlayLoading />;
  // }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 py-5"
                  >
                    <p>
                      {openUpdate?.type === "update"
                        ? `Update Employee Info-${openUpdate?.employee?.email}`
                        : "Create New Employee" || "Unknown"}
                    </p>
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-x-2  grid-flow-dense grid-cols-2">
                      <div className="w-full md:w-full my-3 md:mb-2">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="displayName"
                        >
                          Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-white dark:bg-black text-gray-700 dark:text-white border border-gray-200 dark:border-black dark:focus:border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id={"displayName"}
                          type={"text"}
                          {...register("displayName")}
                          placeholder={"Enter Employee Name"}
                        />

                        {errors["displayName"] && (
                          <p className="text-errorColor text-xs italic">
                            Please fill out this field.
                          </p>
                        )}
                      </div>
                      <div className="w-full md:w-full my-3 md:mb-2">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="appearance-none block w-full bg-white dark:bg-black text-gray-700 dark:text-white border border-gray-200 dark:border-black dark:focus:border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id={"email"}
                          type={"email"}
                          {...register("email")}
                          placeholder={"Enter Employee email"}
                        />

                        {errors["email"] && (
                          <p className="text-errorColor text-xs italic">
                            Please fill out this field.
                          </p>
                        )}
                      </div>
                      <div className="w-full md:w-full my-3 md:mb-2">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="phoneNumber"
                        >
                          Phone Number
                        </label>
                        <input
                          className="appearance-none block w-full bg-white dark:bg-black text-gray-700 dark:text-white border border-gray-200 dark:border-black dark:focus:border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id={"phoneNumber"}
                          type={"text"}
                          {...register("phoneNumber")}
                          placeholder={"Enter Employee Phone Number"}
                          // defaultValue={employee}
                        />

                        {errors["phoneNumber"] && (
                          <p className="text-errorColor text-xs italic">
                            Please fill out this field.
                          </p>
                        )}
                      </div>
                      <div className="w-full md:w-full my-3 md:mb-2">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="role"
                        >
                          Role
                        </label>
                        <select
                          className="select select-accent max-w-full select-sm w-full bg-inherit"
                          {...register("role")}
                          name="role"
                          defaultValue={
                            openUpdate?.employee?.customClaims?.role || ""
                          }
                          onChange={changeRole}
                        >
                          <option
                            selected
                            className="first-letter:capitalize"
                            value={
                              openUpdate?.employee?.customClaims?.role || ""
                            }
                          >
                            {openUpdate?.employee?.customClaims?.role || "-"}
                          </option>
                          <option value={"owner"}>Owner</option>
                          <option value={"admin"}>Admin</option>
                          <option value={"hr"}>HR</option>
                          <option value={"it"}>IT Manager</option>
                        </select>
                      </div>
                      <div className="w-full md:w-full my-3 md:mb-2">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          className="appearance-none block w-full bg-white dark:bg-black text-gray-700 dark:text-white border border-gray-200 dark:border-black dark:focus:border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id={"password"}
                          name={"password"}
                          type={"text"}
                          {...register("password")}
                          minLength={6}
                          placeholder={"*******"}
                        />

                        {errors["password"] && (
                          <p className="text-errorColor text-xs italic">
                            Please fill out this field.
                          </p>
                        )}
                      </div>
                      <div className="w-full md:w-full my-3 md:mb-2 ">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="disabled"
                        >
                          Disable
                        </label>
                        <div class="flex items-center space-x-2">
                          <input
                            id="flexCheckChecked"
                            type="checkbox"
                            {...register("disabled")}
                            value=""
                            className="w-8 h-8 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                          />
                          <label
                            for="flexCheckChecked"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Disable Employee
                          </label>
                        </div>
                        {/* <div className="form-check">
                          <input
                            className=" appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            {...register("disabled")}
                          />
                          <label
                            className="form-check-label inline-block text-gray-800"
                            htmlFor="flexCheckChecked"
                          >
                            Disable Employee
                          </label>
                        </div> */}
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className=" bg-primaryBg hover:opacity-75 rounded-md px-3 py-1 text-white m-1"
                        // disabled={true}
                      >
                        {pageLoading ? (
                          <>
                            <SpingSvgIcon />
                            {openUpdate?.type === "update"
                              ? "Updating"
                              : "Creating"}
                          </>
                        ) : openUpdate?.type === "update" ? (
                          "Update"
                        ) : (
                          "Create"
                        )}
                      </button>
                      <button
                        onClick={() => {
                          // closeModal();
                          props?.setOpenUpdate(false);
                        }}
                        type="button"
                        className=" bg-red-600 hover:opacity-75 rounded-md px-3 py-1 text-white m-1"
                        // className="text-gray-500 bg-red-500 hover:opacity-75 rounded-md px-3 py-1.5 focus:ring-4 focus:outline-none focus:ring-gray-200 border border-gray-200 text-sm font-medium hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        No, cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
