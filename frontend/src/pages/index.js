import { Inter } from "next/font/google";
import withAuth from "@/components/stuff/withAuth"; // Higher order component to protect routes
import Loan from "./Loan";
import Lend from "./Lend";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  const main = useSelector((state) => state.main);
  return (
    <div className="">{main.currentPortal == "Loan" ? <Loan /> : <Lend />}</div>
  );
}

export default withAuth(Home);
