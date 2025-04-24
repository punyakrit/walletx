import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";

function WalletDashboard({
  setIsWalletCreated,
  setPrivateKey,
  privateKey,
}: any) {
    const [mnemonic, setMnemonic] = useState("")
  return (
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
                  Generate a new wallet with a secure seed phrase and private
                  key.
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
                  Recover your wallet using your 12 word seed phrase.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="w-full bg-[#00164D] text-white py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer"
                      onClick={() => {}}
                    >
                      Recover Wallet
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-[#00164D]">
                        Input your 12 word seed phrase
                      </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <Input
                        type="text"
                        placeholder="Mnemonic"
                        onChange={(e) => {
                          setMnemonic(e.target.value);
                        }}
                      />
                    </DialogDescription>
                    <DialogFooter>
                      <Button
                        className="bg-[#00164D] text-white hover:bg-[#002080]"
                        onClick={() => {
                          localStorage.setItem("mnemonic", mnemonic);
                          setIsWalletCreated("seed");
                          localStorage.setItem("wallet", "seed");
                        }}
                      >
                        Recover wallet
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
              Your security is our priority. All wallet data is stored locally
              on your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletDashboard;
