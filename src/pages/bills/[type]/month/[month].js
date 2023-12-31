import Layout from "@/components/Layout/Layout";
import { monthNames } from "@/components/Module/FolderComponents";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

const shipmentTypes = ["Air", "Sea"];

const ShipmentType = ({ type, month }) => {
  const router = useRouter()
const year = router.query?.year
  const breadcrumbs = [
    {
      label: year,
      href: `/bills/${type}/months`,
    },
    {
      label: month,
      href: `/bills/${type}/months`
    }
  ]


  return (
    <Layout breadcrumbs={breadcrumbs} billType={type}>
      <div className="flex flex-col w-full py-5 bg-gray-100">
        <div className="grid grid-cols-3 gap-4">
          {shipmentTypes.map((item, i) => (
            <Link
              className="flex flex-col items-center justify-center h-16 bg-gray-200 rounded"
              key={i}
              href={`/bills/${type}/month/${month}/${item.toLowerCase()}/?year=${year}`}
            >
              <FontAwesomeIcon icon={faFolder} className="" size={"xl"} />
              <p className="mt-2 text-sm">{item}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: monthNames.flatMap((month) => [
      { params: { type: "customer", month } },
      { params: { type: "cnf", month } },
      { params: {type: "packing", month}}
    ]),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { type: params.type, month: params.month } };
}

export default ShipmentType;
