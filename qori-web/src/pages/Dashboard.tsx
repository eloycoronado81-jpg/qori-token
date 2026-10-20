import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import BalanceCard from "../components/dashboard/BalanceCard";
import PortfolioChart from "../components/dashboard/PortfolioChart";
import AssetDistribution from "../components/dashboard/AssetDistribution";
import TransactionHistory from "../components/dashboard/TransactionHistory";
import WalletCard from "../components/dashboard/WalletCard";
import MarketCard from "../components/dashboard/MarketCard";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-black">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 p-8 bg-black overflow-y-auto">

          <BalanceCard />

          <div className="mt-8">
            <PortfolioChart />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

            <AssetDistribution />

            <TransactionHistory />

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

            <WalletCard />

            <MarketCard />

          </div>

        </main>

      </div>

    </div>
  );
}