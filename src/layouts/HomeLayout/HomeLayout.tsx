import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import {
  formatString,
  generateFormatNumber,
} from "@/utils/helpers/generalHelper";
import { InputText } from "primereact/inputtext";
import LatestBlocks from "@/components/modules/LatestBlocks/LatestBlocks";
import LatestTransactions from "@/components/modules/LatestTransactions/LatesTransactions";
import styles from "./HomeLayout.module.scss";
import { ProgressSpinner } from "primereact/progressspinner";

import { ethers } from "ethers";
// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

const HomeLayout = () => {
  const [blockNumber, setBlockNumber] = useState<number>();
  const [blockSearch, setBlockSearch] = useState<any>();
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockNumber();
  }, []);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setBlockSearch([]);
    try {
      setIsLoading(true);
      const searchWithFormat = isHash(search) ? search : Number(search);
      const blockData = await alchemy.core.getBlock(searchWithFormat);
      setBlockSearch(blockData);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const isAddress = (value: string) => {
    try {
      return ethers.isAddress(value);
    } catch (error) {
      return false;
    }
  };

  const isHash = (value: string) => {
    try {
      return ethers.isHexString(value);
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="page-body">
      <div className="text-xl">
        <span className="font-bold text-base">Block Number:</span>{" "}
        {generateFormatNumber(blockNumber)}
      </div>
      <div className="mt-4 flex gap-6 align-items-center">
        <span className="p-input-icon-right w-4">
          <i className="pi pi-search" />
          <InputText
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Block Number or Block Hash"
            onKeyDown={handleKeyDown}
          />
        </span>

        {isLoading && (
          <ProgressSpinner style={{ width: "32px", height: "32px" }} />
        )}

        <div>
          {blockSearch && !isLoading ? (
            <div className={styles.blockCard}>
              <div className="flex gap-4 align-items-center">
                <i className="pi pi-box" />
                <p className="m-0 font-bold">
                  {generateFormatNumber(blockSearch.number)}
                </p>
                <p className="m-0">
                  Transactions: {blockSearch.transactions.length}
                </p>
                <p className="m-0">Miner: {formatString(blockSearch.miner)}</p>
                <p className="m-0">Hash: {formatString(blockSearch.hash)}</p>
                <p className="m-0">
                  Parent hash: {formatString(blockSearch.parentHash)}
                </p>
              </div>
            </div>
          ) : undefined}
        </div>
      </div>
      <div className="flex gap-4">
        {blockNumber && (
          <LatestBlocks blockNumber={blockNumber} alchemy={alchemy} />
        )}
        {blockNumber && (
          <LatestTransactions blockNumber={blockNumber} alchemy={alchemy} />
        )}
      </div>
    </div>
  );
};

export default HomeLayout;
