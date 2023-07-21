import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

import styles from "./LatestTransactions.module.scss";
import {
  formatString,
  generateFormatNumber,
} from "@/utils/helpers/generalHelper";

type Props = {
  blockNumber: number;
  alchemy: Alchemy;
};

const LatestTransactions = ({ blockNumber, alchemy }: Props) => {
  const [transactionsData, setTransactionsData] = useState<any>([]);

  useEffect(() => {
    if (blockNumber) {
      getLatestTransactions();
    }
    return () => {
      setTransactionsData([]);
    };
  }, [blockNumber]);

  const getLatestTransactions = async () => {
    const blockData = await alchemy.core.getBlockWithTransactions(blockNumber);
    setTransactionsData(blockData.transactions.slice(0, 9));
  };

  return (
    <div className="mt-4 w-6">
      <p className="font-bold">Latest transactions</p>
      {transactionsData &&
        transactionsData.length > 0 &&
        transactionsData.map((transaction: any) => {
          return (
            <div className={styles.blockCard} key={transaction.hash}>
              <div className="flex gap-4 align-items-center">
                <i className="pi pi-file-o" />
                <p className="m-0 font-bold">
                  Hash: {formatString(transaction.hash)}
                </p>
                <p className="m-0">From: {formatString(transaction.from)}</p>
                <p className="m-0">To: {formatString(transaction.to)}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LatestTransactions;
