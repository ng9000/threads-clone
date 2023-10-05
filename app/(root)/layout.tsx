import { ClerkProvider, currentUser } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import BottomBar from "@/components/shared/BottomBar";
import { redirect } from "next/navigation";
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
        <body className={inter.className}>
          {user ? (
            <>
              <TopBar />
              <main className="flex flex-row">
                <LeftSideBar />
                <section className="main-container">
                  <div className="w-full max-w-4xl">{children}</div>
                </section>
                <RightSideBar />
              </main>
              <BottomBar />
            </>
          ) : (
            <>
              <Loading />
            </>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
