"use client";
import CreateWallet from "@/components/page/wallet/Create-Wallet";
import WalletDashboard from "@/components/page/wallet/WalletDashboard";
import WalletSection from "@/components/page/wallet/WalletSection";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";

export default function WalletPage() {
  const [privateKey, setPrivateKey] = useState<string>("");
  const [isWalletCreated, setIsWalletCreated] = useState<"default" | string>(
    "default"
  );

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    if (wallet) {
      setIsWalletCreated(wallet);
    }
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#00164D] text-white fixed right-4 bottom-4 hover:bg-[#002080]">
            Clear Local Storage
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#00164D]">
              Clear Local Storage
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            This will clear all data from your local storage.
          </DialogDescription>
          <DialogFooter>
            <Button
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Clear Local Storage
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isWalletCreated === "default" && (
        <>
          <WalletDashboard
            setIsWalletCreated={setIsWalletCreated}
            privateKey={privateKey}
            setPrivateKey={setPrivateKey}
          />
        </>
      )}
      {isWalletCreated === "new" && (
        <div>
          <CreateWallet />
        </div>
      )}
      {isWalletCreated === "seed" && (
        <div>
          <WalletSection/>
        </div>
      )}
      {isWalletCreated === "key" && (
        <div>
          <h1>Wallet</h1>
        </div>
      )}
    </>
  );
}
