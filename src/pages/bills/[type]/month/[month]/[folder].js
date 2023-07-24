import PlaceHolderLoading from "@/common/PlaceHolderLoading";
import Layout from "@/components/Layout/Layout";
import { monthNames } from "@/components/Module/FolderComponents";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const ShipmentNoPage = ({ type, month, folder }) => {
  const [shipmentNos, setShipmentNos] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchShipmentNos() {
      setLoading(true);
      await axios
        .get(
          `/api/shipment-info?year=${2023}&month=${"july"}&shipmentBy=${"air"}`
        )
        .then((res) => {
          const resultArray = removeDuplicatesByProperty(
            res.data.data,
            "shipmentNo"
          );
          setShipmentNos(resultArray);
        })
        .catch((err) => {
          console.log("err", err);
        })
        .finally(() => setLoading(false));
    }
    fetchShipmentNos();
  }, []);

  const breadcrumbs = [
    {
      label: month,
      href: `/bills/${type}/months`,
    },
    {
      label: folder,
      href: `/bills/${type}/month/${month}`,
    },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col w-full py-5 bg-gray-100">
        {loading ? (
          <PlaceHolderLoading loading={true} />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {shipmentNos.map((item, i) => (
              <Link
                className="flex flex-col items-center justify-center h-16 bg-gray-200 rounded"
                key={i}
                href={`/bills/${type}/month/${month}/${folder.toLowerCase()}/${item?.shipmentNo.toLowerCase()}`}
              >
                <FontAwesomeIcon icon={faFolder} className="" size={"xl"} />
                <p className="mt-2 text-sm">{item?.shipmentNo}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: monthNames.flatMap((month) =>
      ["air", "sea"].flatMap((folder) => ({
        params: { type: "customer", month, folder },
      }))
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      type: params.type,
      month: params.month,
      folder: params.folder,
    },
  };
}

export default ShipmentNoPage;

export function removeDuplicatesByProperty(arr, prop) {
  const uniqueMap = new Map();
  return arr.filter((item) => {
    const propertyValue = item[prop];
    return !uniqueMap.has(propertyValue) && uniqueMap.set(propertyValue, 1);
  });
}
