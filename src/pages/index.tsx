import type { NextPage } from "next";
import Head from "next/head";

import Counter from "../features/counter/Counter";
import styles from "../styles/Home.module.css";

import React from "react";
import {
  GelatoLimitOrderPanel,
  GelatoLimitOrdersHistoryPanel,
} from "@gelatonetwork/limit-orders-react";

function LimitOrder() {
  return (
    <>
      {/*To hide common bases in search modal you can pass into the component `showCommonBases={false}` */}
      <GelatoLimitOrderPanel />
      <GelatoLimitOrdersHistoryPanel />
    </>
  );
}

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <LimitOrder />
    </div>
  );
};

export default IndexPage;
