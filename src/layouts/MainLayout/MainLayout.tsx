import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return <div className="body-container">{children}</div>;
};

export default MainLayout;
