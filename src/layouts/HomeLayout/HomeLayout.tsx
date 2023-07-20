import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { generateFormatNumber } from "@/utils/helpers/generalHelper";
import { InputText } from "primereact/inputtext";
import LatestData from "@/components/modules/LatestData/LatestData";
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
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockNumber();
  });

  return (
    <div className="page-body">
      <div className="text-xl">
        <span className="font-bold text-base">Block Number:</span>{" "}
        {generateFormatNumber(blockNumber)}
      </div>
      <div className="mt-4">
        <span className="p-input-icon-right w-4">
          <i className="pi pi-search" />
          <InputText
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </span>
      </div>
      <div>
        {blockNumber && (
          <LatestData blockNumber={blockNumber} alchemy={alchemy} />
        )}
      </div>
    </div>
  );
};

export default HomeLayout;
