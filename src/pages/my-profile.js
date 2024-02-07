import { UserContext } from "@/AuthenticApp/Context/userContext";
import PlaceHolderLoading from "@/common/PlaceHolderLoading";
import { errorAlert } from "@/common/SweetAlert";
import CustomerForm from "@/components/FormSegment/CustomerForm";
import Layout from "@/components/Layout/Layout";
import CustomerGrid from "@/components/Module/Customers/CustomerGrid";
import Modal from "@/components/Module/Modal";
import TabMenu from "@/components/Module/TabMenu";
import UserProfilePage from "@/components/Profile/UserProfile";
import CustomersBillCal from "@/components/ShipmentBill/CustomersBillCal";
import ShipmentBillCal from "@/components/ShipmentBill/ShipmentBillCal";
import ShipmentBillGrid from "@/components/ShipmentBill/ShipmentBillGrid";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  console.log("iser", user);
  return (
    <Layout>
      <UserProfilePage/>
    </Layout>
  );
};

export default UserProfile;
