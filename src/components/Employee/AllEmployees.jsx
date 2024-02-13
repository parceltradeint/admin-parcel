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
        {/* <Table
          columns={columns}
          data={data}
          // handleProve={handleProve}
          loading={loading}
          error={error}
        /> */}
        {/* {data?.map((item, i) => {
          const summary = summaryData(item);
          return (
            <>
              <div className="flex md:justify-between md:flex-row flex-col md:px-10 px-1 py-3">
                <div>
                  <p>Uid: {item?.uid}</p>
                  <p>Email: {item?.email}</p>
                  <p>Phone Number: {item?.phone_number || ""}</p>
                  <p>Name: {item?.displayName || ""}</p>
                </div>
                <div>
                  <p>Role: {item?.customClaims?.role || "Is Employee"}</p>
                  <p>Created Time: {item?.metadata?.creationTime || ""}</p>
                  <p>
                    Last Sign Time:{" "}
                    {item?.metadata?.lastSignInTime || "Not Sign In"}
                  </p>
                  <p>
                    Last Refresh Time:{" "}
                    {item?.metadata?.lastRefreshTime || "Not Sign In"}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 p-2">
                <button
                  className="btn btn-accent px-3 py-0.5 btn-sm m-1"
                  type="button"
                  //   disabled={!isValid}
                  onClick={() => {
                    update_employee(item);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-error px-3 py-0.5 btn-sm m-1"
                  type="button"
                  //   disabled={!isValid}
                  // onClick={() => {
                  //   update_withdraw(item);
                  // }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleLoginAsEmployee(item?.uid);
                  }}
                  type="button"
                  className="btn btn-info px-3 py-0.5 btn-sm m-1"
                >
                  Login As Employee
                </button>
              </div>
            </>
          );
        })} */}

        <ReactTable
          data={[]}
          columns={[
            {
              Header: "SL",
              accessor: "sl",
              width: 60,
              // Footer: () => <p className="text-center">Total-</p>,
            },
            {
              Header: "Name",
              accessor: "dispalyName",
              width: 200
              // Footer: () => <p className="text-center">Total-</p>,
            },
            {
              Header: "PhoneNumber",
              accessor: "phoneNumber",
              // value: value?.phoneNumber || "",
            },
            {
              Header: "email",
              accessor: "email",
              // value: value?.email || "",
            },
            {
              Header: "role",
              accessor: "role",
              // value: value?.role || "Is Employee",
            },
            {
              Header: "Created Time",
              accessor: "dispalyName",
              Cell: ({ row }) =>
                formartDate(row._original?.createdAt?._seconds * 1000, true),
            },
            {
              Header: "Status",
              accessor: "status",
            },
            {
              Header: "Last Active",
              accessor: "lastActive",
              // value: `${formartDate(
              //   value?.lastActive || Date.now(),
              //   true
              // )} - ${timeSince(value.lastActive)}`,
            },
            {
              Header: "Action",
              accessor: "#",
              Cell: ({ row }) => (
                <div className="flex space-x-2 p-2">
                  <button
                    className="btn btn-accent px-3 py-0.5 btn-sm m-1"
                    type="button"
                    //   disabled={!isValid}
                    onClick={() => {
                      update_employee(item);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-error px-3 py-0.5 btn-sm m-1"
                    type="button"
                    //   disabled={!isValid}
                    // onClick={() => {
                    //   update_withdraw(item);
                    // }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleLoginAsEmployee(item?.uid);
                    }}
                    type="button"
                    className="btn btn-info px-3 py-0.5 btn-sm m-1"
                  >
                    Login As Employee
                  </button>
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

export function Modal(props) {
  let [isOpen, setIsOpen] = useState(true);
  const { user } = useContext(UserContext);
  const [pageLoading, setPageLoading] = useState(false);
  const { openUpdate, setOpenUpdate, refetch } = props;
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
    // console.log("cell", cell.original);
    // setPageLoading(true);
    const update = httpsCallable(functions, "updateUser");
    return update({ ...data })
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log("error", error);
        return error;
        // setPageLoading(false);
        // errorAlert("Something went wrong!");
      });
  };

  const createEmployee = async (data) => {
    // console.log("cell", cell.original);
    // setPageLoading(true);
    const create = httpsCallable(functions, "createNewUser");
    return create({ ...data })
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log("error", error);
        return error;
        // setPageLoading(false);
        // errorAlert("Something went wrong!");
      });
  };

  const onSubmit = async (data) => {
    setPageLoading(true);
    const newData = {
      uid: data.uid,
      displayName: data.displayName,
      email: data.email,
      disabled: data.disabled,
      phoneNumber: `+88${data?.phoneNumber}`,
      customClaims: {
        ...data?.customClaims,
        role: data.role,
        update: openUpdate?.type === "create" ? true : roleUpdate,
      },
    };

    // if (user.role === "owner" || user.role === "admin") {
    //   newData["customClaims"] = {
    //     ...data?.customClaims,
    //     role: data.role,
    //     update: openUpdate?.type === "create" ? true : roleUpdate,
    //   };
    // }

    if (watch("password")?.length > 6) {
      newData["password"] = watch("password");
    }
    if (watch("phoneNumber")?.length > 12) {
      newData["phoneNumber"] = watch("phoneNumber");
    }
    if (openUpdate?.type === "create") {
      newData["customClaims"]["isEmployee"] = true;
    }
    let res;
    if (openUpdate?.type === "update") {
      res = await updateEmployee(newData);
    }
    if (openUpdate?.type === "create") {
      res = await createEmployee(newData);
    }

    if (res?.uid) {
      setPageLoading(false);
      setOpenUpdate(false);
      setRoleUpdate(false);
      closeModal();
      refetch();
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                          {...register("email", {
                            required:
                              openUpdate?.type === "create" ? true : false,
                          })}
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
                          htmlFor="displayName"
                        >
                          Phone Number
                        </label>
                        <input
                          className="appearance-none block w-full bg-white dark:bg-black text-gray-700 dark:text-white border border-gray-200 dark:border-black dark:focus:border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id={"phoneNumber"}
                          type={"number"}
                          {...register("phoneNumber")}
                          placeholder={"Enter Employee Phone Number"}
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
                          <option value={"it"}>IT Manager</option>
                          <option value={"analytics"}>Analytics</option>
                          <option value={"finance"}>Finance</option>
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
                          type={"text"}
                          {...register("password", {
                            required:
                              openUpdate?.type === "create" ? true : false,
                          })}
                          placeholder={"Enter Employee password"}
                        />

                        {errors["password"] && (
                          <p className="text-errorColor text-xs italic">
                            Please fill out this field.
                          </p>
                        )}
                      </div>
                      <div className="w-full md:w-full my-3 md:mb-2">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="disabled"
                        >
                          Disable
                        </label>
                        <div className="form-check">
                          <input
                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className=" bg-primaryBg hover:opacity-75 rounded-md px-3 py-1 text-white m-1"
                        disabled={true}
                        >
                        {openUpdate?.type === "update" ? "Update" : "Create"}
                      </button>
                      <button
                        onClick={() => {
                          closeModal();
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
