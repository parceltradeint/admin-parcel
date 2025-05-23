import React from "react";
import Footer from "./Footer";
const Body = ({ children }) => {
  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none mainBody bg-sideBar">
      <div className="">
        {/* <div className=" h-auto max-h40 overflow-auto mx-auto w-[30%] mt-2">
          <Section>
            <p>adds Banner</p>
          </Section>
        </div> */}
        <div className="mt-5">
          <div className="max-w-full md:px-[1%] mx-auto sm:px-1 px-2 ">
            {children}
          </div>
        </div>
        {/* <div className="">
          <Footer />
        </div> */}
      </div>
    </main>
  );
};

export default Body;
