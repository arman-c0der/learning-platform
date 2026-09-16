import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
const poppins = Inter({ subsets: ["latin"], variable: "--font-poppins" });

export const metadata = {
  title: "EduConnect - Wold's Best Learning Platform",
  description: "Explore || Learn || Build || Share",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, poppins.className, "bg-[#0a0512] min-h-screen")}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}