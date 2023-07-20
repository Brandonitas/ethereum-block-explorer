import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

import styles from "./LatestData.module.scss";
import { generateFormatNumber } from "@/utils/helpers/generalHelper";

import { ethers } from "ethers";

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

    const initialBlock = blockNumber - 10;
    for (let i = initialBlock; i <= blockNumber; i++) {
      const blockData = await alchemy.core.getBlock(i);
      console.log("BLOCK DATA", blockData);
      setBlocksData((prev: any) => [...prev, blockData]);
    }
  };

  const formatString = (str: string): string => {
    if (str.length <= 6) {
      return str; // Si el string tiene 6 caracteres o menos, no se modifica
    } else {
      const firstThree = str.substr(0, 3);
      const lastThree = str.substr(-3);
      return `${firstThree}...${lastThree}`;
    }
  };

  return (
    <div className="mt-4">
      {blocksData &&
        blocksData.length > 0 &&
        blocksData
          .slice()
          .reverse()
          .map((block: any) => {
            return (
              <>
                <div className={styles.blockCard}>
                  <div className="flex gap-4 align-items-center">
                    <i className="pi pi-box" />
                    <p className="m-0 font-bold">
                      {generateFormatNumber(block.number)}
                    </p>
                    <p className="m-0">
                      Transactions: {block.transactions.length}
                    </p>
                    <p className="m-0">Miner: {formatString(block.miner)}</p>
                    <p className="m-0">
                      Gas: {ethers.formatEther(block.gasUsed._hex)}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
    </div>
  );
};

export default LatestData;
