import { DarkModeProvider } from "@/components/DarkModeContext";
import NavBar from "@/components/NavBar";
import StockSymbols from "@/components/StockSymbols";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-50 flex flex-col items-center p-10 gap-4">
      <DarkModeProvider>
        <NavBar />
        <h1 className="text-4xl font-bold text-center uppercase w-full">
          stock Analysis
        </h1>
        <StockSymbols />
      </DarkModeProvider>
    </main>
  );
}
