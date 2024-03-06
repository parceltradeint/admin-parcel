import Layout from "@/components/Layout/Layout";
import Link from "next/link";

const AccessDenied = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-40 py-20 bg-white rounded-md shadow-xl">
          <div className="flex flex-col items-center">
            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> You don&apos;t have
              access to this resource!
            </h6>

            <p className="mb-8 text-center text-gray-500 md:text-lg">
              Contact system admin for access!
            </p>

            <Link href="/">
              <p className="px-6 py-2 text-sm font-semibold text-cyan-700 bg-cyan-100">
                Go home
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccessDenied;
