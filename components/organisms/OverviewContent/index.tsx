import React, { useCallback, useEffect, useState } from "react";
import CardItem from "./CardItem";
import TableRow from "./TableRow";
import { getMemberOverview } from "@/services/player";
import { toast } from "react-toastify";
import {
  CategoryTypes,
  CountTypes,
  DashboardOverviewTypes,
  PaymentTypes,
} from "@/services/data-types";

export default function OverviewContent() {
  const [count, setCount] = useState([]);
  const [data, setData] = useState([]);

  const getMemberOverviewAPI = useCallback(async () => {
    const response = await getMemberOverview();
    if (response.error) {
      toast.error(response.message);
    } else {
      console.log("Data >>>", response.data.data);
      setCount(response.data.count);
      setData(response.data.data);
    }
  }, [getMemberOverview]);

  useEffect(() => {
    getMemberOverviewAPI();
  }, []);

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Top Up Categories
          </p>
          <div className="main-content">
            <div className="row">
              {count.map((item: CountTypes) => (
                <CardItem
                  key={item._id}
                  nominal={item.value}
                  image="ic-desktop"
                >
                  {item.name}
                </CardItem>
              ))}
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="text-start" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Membuat Prop Types */}
                {data.map((item: DashboardOverviewTypes) => (
                  <TableRow
                    key={item._id}
                    image={item.historyVoucherTopup?.thumbnail}
                    title={item.historyVoucherTopup?.gameName}
                    category={item.historyVoucherTopup?.category}
                    item={item.historyVoucherTopup?.coinQuantity}
                    itemName={item.historyVoucherTopup?.coinName}
                    price={item.historyVoucherTopup?.price}
                    status={item.status}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
