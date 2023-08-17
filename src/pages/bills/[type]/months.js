import Layout from "@/components/Layout/Layout";
import FolderComponents from "@/components/Module/FolderComponents";
import Link from "next/link";
import { useRouter } from "next/router";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthsPage = ({ type }) => {
  return (
    <Layout billTypetype={type}>
      <FolderComponents path={`/bills/${type}/month`} />
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { type: "customer" } }, { params: { type: "cnf" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { type: params.type } };
}

export default MonthsPage;
