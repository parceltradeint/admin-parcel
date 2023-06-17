import React, { useContext, useEffect } from "react";
import { NumericFormat } from "react-number-format";


const HeaderInfo = () => {
  // const { user, setUser } = useContext(UserContext);
  return (
    <div className=" flex items-center justify-center md:space-x-2 md:flex-row flex-col space-y-2 md:space-y-0">
      <span className="flex space-x-3 items-center justify-center">
        <button className="px-2 font-medium py-1 tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          {/* <NumericFormat
            value={user?.earning_bal}
            valueIsNumericString={true}
            decimalSeparator="."
            decimalScale={4}
            displayType="text"
            type="text"
            thousandSeparator={true}
            prefix={"Earning $"}
            fixedDecimalScale={true}
          /> */}
        </button>
        {/* <p className="md:hidden inline-block bg-pink-600 text-white rounded-md py-0.5 px-2">User-ID: {user?.userId}</p> */}
      </span>
      <span className="flex space-x-3 items-center justify-center">
        <button className="px-2 font-medium py-1 tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          {/* <NumericFormat
            value={user.deposit_bal}
            valueIsNumericString={true}
            decimalSeparator="."
            decimalScale={2}
            displayType="text"
            type="text"
            thousandSeparator={true}
            prefix={"Deposit $"}
            fixedDecimalScale={true}
          /> */}
        </button>

      </span>
      <p className="hidden md:inline-block px-2 bg-pink-600 text-white rounded-md py-1">
        {/* User-ID: {user?.userId} */}
      </p>
    </div>
  );
};

export default HeaderInfo;
