import BillFormSegment from "@/components/FormSegment/BillFormSegment";
import Layout from "@/components/Layout/Layout";
import { Router, useRouter } from "next/router";
import React from "react";

const NewBill = () => {
  const router = useRouter()
  return (
    <Layout>
      <BillFormSegment editMode={false}/>
    </Layout>
  );
};

export default NewBill;
