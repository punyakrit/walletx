"use client";
import CreateWallet from "@/components/page/wallet/Create-Wallet";
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
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function WalletPage() {
  const [privateKey, setPrivateKey] = useState<string>("");
  const [isWalletCreated, setIsWalletCreated] = useState<"default" | string>(
    "default"
  );
  const router = useRouter();

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
        <div className="min-h-screen bg-[#E4F6FF]">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl text-[#00164D] font-bold text-center mb-12">
                Access Your Wallet
              </h1>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="h-1.5 bg-[#00164D] rounded-t-2xl"></div>
                  <div className="px-6 py-8">
                    <div className="w-16 h-16 bg-[#E4F6FF] rounded-full flex items-center justify-center mb-6 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-[#00164D]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-[#00164D] mb-3">
                      Create New Wallet
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                      Generate a new wallet with a secure seed phrase and
                      private key.
                    </p>
                    <button
                      className="w-full bg-[#00164D] text-white py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        setIsWalletCreated("new");
                        localStorage.setItem("wallet", "new");
                      }}
                    >
                      Create Wallet
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="h-1.5 bg-[#00164D] rounded-t-2xl"></div>
                  <div className="px-6 py-8">
                    <div className="w-16 h-16 bg-[#E4F6FF] rounded-full flex items-center justify-center mb-6 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-7 h-7 text-[#00164D]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-[#00164D] mb-3">
                      Use Seed Phrase
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                      Recover your wallet using your 12 or 24-word seed phrase.
                    </p>
                    <button
                      className="w-full bg-[#00164D] text-white py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        setIsWalletCreated("seed");
                        localStorage.setItem("wallet", "seed");
                      }}
                    >
                      Recover Wallet
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="h-1.5 bg-[#00164D] rounded-t-2xl"></div>
                  <div className="px-6 py-8">
                    <div className="w-16 h-16 bg-[#E4F6FF] rounded-full flex items-center justify-center mb-6 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-7 h-7 text-[#00164D]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-[#00164D] mb-3">
                      Private Key Login
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                      Access your wallet by entering your private key securely.
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="w-full bg-[#00164D] text-white py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer"
                          onClick={() => {}}
                        >
                          Login with Key
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-[#00164D]">
                            Input Private Key
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          <Input
                            type="text"
                            placeholder="Private Key"
                            onChange={(e) => {
                              setPrivateKey(e.target.value);
                            }}
                          />
                        </DialogDescription>
                        <DialogFooter>
                          <Button
                            className="bg-[#00164D] text-white hover:bg-[#002080]"
                            onClick={() => {
                              localStorage.setItem("privateKey", privateKey);
                              setIsWalletCreated("key");
                              localStorage.setItem("wallet", "key");
                            }}
                          >
                            Save Private Key
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-sm text-[#00164D]/60">
                  Your security is our priority. All wallet data is stored
                  locally on your device.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isWalletCreated === "new" && (
        <div>
          <CreateWallet />
        </div>
      )}
      {isWalletCreated === "seed" && (
        <div>
          <h1>Seed Phrase</h1>
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
