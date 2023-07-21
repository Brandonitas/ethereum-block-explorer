import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

import styles from "./LatestBlocks.module.scss";
import {
  formatString,
  generateFormatNumber,
} from "@/utils/helpers/generalHelper";

type Props = {
  blockNumber: number;
  alchemy: Alchemy;
};

const LatestData = ({ blockNumber, alchemy }: Props) => {
  const [blocksData, setBlocksData] = useState<any>([]);

  useEffect(() => {
    if (blockNumber) {
      getLatestBlocks();
    }
    return () => {
      setBlocksData([]);
    };
  }, [blockNumber]);

  const getLatestBlocks = async () => {
    //setBlockNumber(await alchemy.core.getBlockNumber());

    const initialBlock = blockNumber - 8;
    for (let i = initialBlock; i <= blockNumber; i++) {
      const blockData = await alchemy.core.getBlock(i);
      setBlocksData((prev: any) => [...prev, blockData]);
    }
  };

  return (
    <div className="mt-4 w-6">
      <p className="font-bold">Latest blocks</p>
      {blocksData &&
        blocksData.length > 0 &&
        blocksData
          .slice()
          .reverse()
          .map((block: any) => {
            return (
              <div className={styles.blockCard} key={block.hash}>
                <div className="flex gap-4 align-items-center">
                  <i className="pi pi-box" />
                  <p className="m-0 font-bold">
                    {generateFormatNumber(block.number)}
                  </p>
                  <p className="m-0">
                    Transactions: {block.transactions.length}
                  </p>
                  <p className="m-0">Miner: {formatString(block.miner)}</p>
                  <p className="m-0">Hash: {formatString(block.hash)}</p>
                  <p className="m-0">
                    Parent hash: {formatString(block.parentHash)}
                  </p>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default LatestData;
