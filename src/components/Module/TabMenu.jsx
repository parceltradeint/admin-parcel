import Link from "next/link";
import React from "react";
import Layout from "../Layout/Layout";
import OutBound from "./OutBound";
import InBound from "./InBound";

const TabMenu = (props) => {
  const { tabItems } = props;

  return (
    <Layout>
      <div className=" space-y-6">
        <div className="tabs tabs-boxed bg-gray-100 justify-center space-x-6">
          {tabItems.map((item, index) => {
            return (
              <Link {...item.path} key={index}>
                <p
                  className={`${
                    item.path.as === props.asPath ? "tab-active" : ""
                  } tab text-sideBarText font-semibold bg-gr`}
                >
                  {item?.Parent}
                </p>
              </Link>
            );
          })}
        </div>
        {props.asPath === "/outbound/air-shipment" && (
          <OutBound type={"By Air"} />
        )}
        {props.asPath === "/outbound/sea-shipment" && (
          <OutBound type={"By Sea"} />
        )}
        {props.asPath === "/inbound/air-shipment" && (
          <InBound type={"By Air"} />
        )}
        {props.asPath === "/inbound/sea-shipment" && (
          <OutBound type={"By Sea"} />
        )}
        {/* {props.asPath === "/deposit/instant-deposit" && <InstantDepositForm />}
        {props.asPath === "/deposit/manual-deposit" && <ManuallyDeposit />}
        {props.asPath === "/deposit/convert-earning" && <ConvertEarning />}
        {props.asPath === "/deposit/deposit-history" && <DepositHistory />}
        {props.asPath === "/withdraw/wallet" && <Withdraw />}
        {props.asPath === "/withdraw/withdraw-history" && <WithdrawHistory />}
        {props.asPath === "/work/my-task" && <MyTask />
          }
        {props.asPath === "/work/accept-task" && <AcceptTask/>}
        {props.asPath === "/advertisement/ads-history" && <AdsHistory />}
        {props.asPath === "/advertisement/new-ads" && <NewAds />} */}
      </div>
    </Layout>
  );
};

export default TabMenu;
