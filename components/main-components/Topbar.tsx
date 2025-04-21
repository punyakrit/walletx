"use client";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function Topbar() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center my-4 bg-[#a8ddff] px-8 py-4 rounded-4xl text-[#00164d]">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="font-bold text-2xl cursor-pointer"
      >
        WalletX
      </div>
      <div
        className="cursor-pointer font-bold"
        onClick={() => {
          router.push("https://github.com/punyakrit/walletx");
        }}
      >
        <Github />
      </div>
    </div>
  );
}

export default Topbar;
