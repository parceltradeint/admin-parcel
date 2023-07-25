import Layout from '@/components/Layout/Layout';
import InBound from '@/components/Module/InBound';
import OutBound from '@/components/Module/OutBound';
import { useRouter } from 'next/router';

const ShipmentPage = () => {
  const router = useRouter();
  const { month, folder, shipmentNo, type } = router.query;
  // Replace this with your data retrieval logic for the specific shipmentNo
  const breadcrumbs = [
    {
      label: month,
      href: `/bills/${type}/months`
    },
    {
      label: folder,
      href: `/bills/${type}/month/${month}`
    },
    {
      label: shipmentNo,
      href: `/bills/${type}/month/${month}/${folder?.toLowerCase()}`
    }
  ]
console.log("type", type);
  return (
    <Layout breadcrumbs={breadcrumbs}>
      {
        type === "customer" && <OutBound type={folder?.toLowerCase()} shipmentNo={`${shipmentNo}`} />
      }
      {
        type === "cnf" && <InBound type={folder?.toLowerCase()} shipmentNo={`${shipmentNo}`} />
      }
      {/* <h1>Month: {month}</h1>
      <h2>Shipment Type: {folder} </h2>
      <h3>Shipment No: {shipmentNo}</h3> */}
      {/* Display your list of data here */}
    </Layout>
  );
};

export default ShipmentPage;
