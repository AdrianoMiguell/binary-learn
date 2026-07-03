// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";

export const metadata: Metadata = {
  title: "Binary Learning",
  description: "Domine conversões de bases númericas",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${inter.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body>
        {children}
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import "./globals.css";
// import "next/font/google";
// import { ThemeProvider } from "@/components/ui/theme-provider";
// import { Inter } from "next/font/google";
// import React from "react";
// import blobBack from "@/public/assets/blob_back_padrao.svg";
// import blobBack2 from "@/public/assets/blob_back_padrao_2.svg";
// import Image from "next/image";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app_sidebar";
// import AppHeader from "@/components/app_header";

// export const metadata: Metadata = {
//   title: "Binary Learning",
//   description: "Domine conversões de bases númericas",
// };

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="pt-br" className={`${inter.className} h-full antialiased`}>
//       <body>
//         {children}

//         <Image
//           src={blobBack}
//           alt="Blob para fundo"
//           className="fixed h-auto w-full min-w-110 max-w-125 left-[-300] bottom-[-150] md:bottom-[-200] md:left-[-200] -z-10 opacity-75"
//         />

//         <Image
//           src={blobBack2}
//           alt="Blob para fundo"
//           className=" fixed h-auto translate w-full min-w-110 max-w-125 right-[-250] bottom-[-150] md:bottom-[-200] md:right-[-200] scale-x-[-1] scale-y-[-1] -z-10 opacity-75"
//         />
//       </body>
//     </html>
//   );
// }
