import PlaceHolderLoading from "@/common/PlaceHolderLoading";
import BillFormSegment from "@/components/FormSegment/BillFormSegment";
import Layout from "@/components/Layout/Layout";
import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditBill = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const options = {
      id: router.query?.slug,
    };

    async function fetchData() {
      setLoading(true);
      await axios
        .get(`/api/outbound`, {
          params: options,
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log("err", err))
        .finally(() => setLoading(false));
    }
    if (router.query?.slug) {
      fetchData();
    }
  }, [router.query?.slug]);
  return (
    <Layout>
      {loading ? (
        <PlaceHolderLoading loading={true} />
      ) : (
        <BillFormSegment editMode={data} />
      )}
    </Layout>
  );
};

export default EditBill;
