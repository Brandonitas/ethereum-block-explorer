import { useRouter } from "next/router";
import { useEffect } from "react";

const App = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, []);

  return <div></div>;
};

export default App;
