import NoRecord from "@/common/NoRecord";
import PlaceHolderLoading from "@/common/PlaceHolderLoading";
import Layout from "@/components/Layout/Layout";
import { monthNames } from "@/components/Module/FolderComponents";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ShipmentNoPage = ({ type, month, folder }) => {
  const [shipmentNos, setShipmentNos] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter()
  const year = router.query?.year

  useEffect(() => {
    async function fetchShipmentNos() {
      setLoading(true);
      await axios
        .get(
          `/api/shipment-info?year=${year}&month=${month.toLowerCase()}&shipmentBy=${folder.toLowerCase()}&type=${type}`
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
  }, [folder, month, type, year]);

  const breadcrumbs = [
    {
      label: year,
      href: `/bills/${type}/months`,
    },
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
    <Layout breadcrumbs={breadcrumbs} billType={type}>
      <div className="flex flex-col w-full py-5 bg-gray-100">
        {loading ? (
          <PlaceHolderLoading loading={true} />
        ) : (
          <>
            {shipmentNos.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {shipmentNos.sort((a, b) => Number(a.shipmentNo) - Number(b.shipmentNo)).map((item, i) => (
                  <Link
                    className="flex flex-col items-center justify-center h-16 bg-gray-200 rounded"
                    key={i}
                    href={`/bills/${type}/month/${month}/${folder.toLowerCase()}/${item?.shipmentNo.toLowerCase()}/?year=${year}`}
                  >
                    <FontAwesomeIcon icon={faFolder} className="" size={"xl"} />
                    <p className="mt-2 text-sm">{item?.shipmentNo}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <NoRecord />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export async function getStaticPaths(props) {
  return {
    paths: monthNames.flatMap((month) =>
      ["customer", "cnf", "packing"].flatMap((type) =>
        ["air", "sea"].flatMap((folder) => ({
          params: { type, month, folder },
        }))
      )
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
