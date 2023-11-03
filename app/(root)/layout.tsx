import { ClerkProvider, currentUser } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import BottomBar from "@/components/shared/BottomBar";
import { redirect } from "next/navigation";
import Image from "next/image";
import svgImage from "@/components/loader/loader.svg";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads-Clone",
  description: "A next js 13 threads clone application",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          {user ? (
            <>
              <TopBar />
              <main className="flex flex-row">
                <LeftSideBar />
                <section className="main-container">
                  <div className="w-full max-w-4xl">
                    <Suspense
                      fallback={
                        <div className="text-9xl text-light-1">Loading...</div>
                      }
                    >
                      {children}
                    </Suspense>
                  </div>
                </section>
                <RightSideBar />
              </main>
              <BottomBar />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-dark-1">
              <Image
                src={svgImage}
                width={50}
                height={50}
                alt="loader"
                className="object-contain text-light-1"
              />
            </div>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
