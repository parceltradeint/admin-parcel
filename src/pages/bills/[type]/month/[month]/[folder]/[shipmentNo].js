import Layout from '@/components/Layout/Layout';
import InBound from '@/components/Module/InBound';
import OutBound from '@/components/Module/OutBound';
import Packing from '@/components/Module/Packing';
import { useRouter } from 'next/router';

const ShipmentPage = () => {
  const router = useRouter();
  const { month, folder, shipmentNo, type, year } = router.query;
  // Replace this with your data retrieval logic for the specific shipmentNo
  const breadcrumbs = [
    {
      label: year,
      href: `/bills/${type}/months`
    },
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
  return (
    <Layout breadcrumbs={breadcrumbs} billType={type}>
      {
        type === "customer" && <OutBound type={folder?.toLowerCase()} shipmentNo={`${shipmentNo}`} month={month} year={year} />
      }
      {
        type === "cnf" && <InBound type={folder?.toLowerCase()} shipmentNo={`${shipmentNo}`} month={month} year={year}/>
      }
      {
        type === "packing" && <Packing type={folder?.toLowerCase()} shipmentNo={`${shipmentNo}`} month={month} year={year}/>
      }
      {/* <h1>Month: {month}</h1>
      <h2>Shipment Type: {folder} </h2>
      <h3>Shipment No: {shipmentNo}</h3> */}
      {/* Display your list of data here */}
    </Layout>
  );
};

export default ShipmentPage;
