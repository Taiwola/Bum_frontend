import BlurPage from "@/global/blur-page";
import React from "react";


export default function PipelinesLayout({children}: {children: React.ReactNode}) {
  return (
    <BlurPage>{children}</BlurPage>
  )
}