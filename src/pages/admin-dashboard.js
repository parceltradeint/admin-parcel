import { UserContext } from "@/AuthenticApp/Context/userContext";
import { isAccessModule } from "@/common/AccessLevel";
import OverlayLoading from "@/common/OverlayLoading";
import PlaceHolderLoading from "@/common/PlaceHolderLoading";
import { errorAlert } from "@/common/SweetAlert";
import AllEmployees from "@/components/Employee/AllEmployees";
import CustomerForm from "@/components/FormSegment/CustomerForm";
import Layout from "@/components/Layout/Layout";
import CustomerGrid from "@/components/Module/Customers/CustomerGrid";
import Modal from "@/components/Module/Modal";
import TabMenu from "@/components/Module/TabMenu";
import CustomersBillCal from "@/components/ShipmentBill/CustomersBillCal";
import ShipmentBillCal from "@/components/ShipmentBill/ShipmentBillCal";
import ShipmentBillGrid from "@/components/ShipmentBill/ShipmentBillGrid";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  // const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const quotesPerPage = 25;
  const pagesVisited = pageNumber * quotesPerPage;
  const [pageCount, setPageCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(false);
  const { user, loadingUser } = useContext(UserContext);

  const pagginationHandler = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleSearch = async (search) => {
    let searchText =
      searchInput.length > 0 ? encodeURI(searchInput.trim()) : "";
    async function fetchCustomer() {
      setLoading(true);
      await axios
        .get(`/api/customers-bills`)
        .then((res) => {
          console.log("res", res);
          setData(res.data);
        })
        .catch((err) => {
          errorAlert("Something went wrong!");
        })
        .finally(() => setLoading(false));
    }
    fetchCustomer();
  };

  const handleKeyDown = (e) => {
    let key = false;
    if (e.key === "Enter") {
      key = true;
      setPageNumber(0);
      if (key) {
        handleSearch();
      }
    }
  };

  const handleClear = () => {
    setSearchInput("");
    setLoading("clear");
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    // setPageNumber(0)
  };

  const tabItems = [
    {
      id: 1,
      label: "ALL EMPLOYEE",
      value: <AllEmployees />,
    },
  ];
  if (loadingUser) {
    return <OverlayLoading />;
  }
  if (!isAccessModule(user.access, `/admin-dashboard`)) {
    router.push("/403");
  }
  return (
    <Layout>
      <div>
        <div className=" bg-white shadow-sm">
          <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 space-y-2 md:space-y-0 justify-between items-center">
            <div className={"ml-4 "}>
              <h1 className="text-lg leading-6 font-semibold text-gray-900">
                ADMIN DATABASE
              </h1>
            </div>
          </div>
        </div>
        <TabMenu tabItems={tabItems} />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
