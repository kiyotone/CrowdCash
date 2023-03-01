import { Inter } from "next/font/google";
import withAuth from "@/components/stuff/withAuth"; // Higher order component to protect routes
import Loan from "./Loan";
import Lend from "./Lend";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return (
    <div className="">
      <Loan />
      {/* <Lend /> */}
    </div>
  );
}

export default withAuth(Home);
