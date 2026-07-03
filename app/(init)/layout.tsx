// app/(site)/layout.tsx
"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import blobBack from "@/public/assets/blob_back_padrao.svg";
import blobBack2 from "@/public/assets/blob_back_padrao_2.svg";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Verifica se a rota atual é de autenticação (login ou register)
  const isAuthPage =
    pathname.includes("/login") || pathname.includes("/register");

  return (
    <div className="relative min-h-screen w-full">
      <main className="h-screen flex justify-center items-center">
        {isAuthPage ? (
          <Card className="flex w-full max-w-125 min-h-75 m-6 z-10 shadow-lg">
            <CardContent className="w-full p-6">{children}</CardContent>
          </Card>
        ) : (
          children
        )}
      </main>

      <Image
        src={blobBack}
        alt="Blob para fundo"
        className="fixed h-auto w-full min-w-85 max-w-105 left-[-200px] bottom-[-150px] md:bottom-[-200px] md:left-[-200px] -z-10 opacity-75"
      />

      <Image
        src={blobBack2}
        alt="Blob para fundo"
        className="fixed h-auto w-full min-w-110 max-w-125 right-[-250px] bottom-[-150px] md:bottom-[-200px] md:right-[-200px] scale-x-[-1] scale-y-[-1] -z-10 opacity-75"
      />
    </div>
  );
}

//      <Image
//           src={blobBack}
//           alt="Blob para fundo"
//           className="fixed h-auto w-full min-w-110 max-w-125 left-[-300] bottom-[-150] md:bottom-[-200] md:left-[-200] -z-10 opacity-75"
//         />

//         <Image
//           src={blobBack2}
//           alt="Blob para fundo"
//           className=" fixed h-auto translate w-full min-w-110 max-w-125 right-[-250] bottom-[-150] md:bottom-[-200] md:right-[-200] scale-x-[-1] scale-y-[-1] -z-10 opacity-75"
//         />

// import { Card, CardContent } from "@/components/ui/card";

// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <main className="h-screen flex justify-center items-center">
//       <Card className="flex w-full max-w-125 min-h-75 m-6">
//         <CardContent>{children}</CardContent>
//       </Card>
//     </main>
//   );
// }
