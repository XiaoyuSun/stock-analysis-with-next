import StockSymbols from "@/components/StockSymbols";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div>Stock Analysis</div>
      <StockSymbols />
    </main>
  );
}
