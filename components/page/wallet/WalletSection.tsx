import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import React, { useEffect, useState } from "react";
import nacl from "tweetnacl";
import { getAccountInfo } from "@/app/actions/solana";
import {
  ClipboardCopy,
  Wallet,
  ArrowRightLeft,
  BarChart4,
  Settings,
  ChevronDown,
  Copy,
  ExternalLink,
} from "lucide-react";

function WalletSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("assets");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const generateKeypair = async () => {
      const mnemonic = localStorage.getItem("mnemonic");
      if (mnemonic) {
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        console.log(keypair.secretKey);
        const pubKey = keypair.publicKey.toBase58();
        console.log(pubKey);
        setPublicKey(pubKey);
        fetchBalance(pubKey);
      }
    };

    generateKeypair();
  }, [currentIndex]);

  const fetchBalance = async (pubKey: string) => {
    try {
      setIsLoading(true);
      const data = await getAccountInfo(pubKey);

      if (data.result && data.result.value) {
        const lamports = data.result.value.lamports || 0;
        setBalance(lamports / LAMPORTS_PER_SOL);
      } else {
        setBalance(0);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextWallet = () => {
    setCurrentIndex((c) => c + 1);
  };

  const copyToClipboard = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const truncateAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.substring(0, 4)}...${address.substring(
      address.length - 4
    )}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-xl shadow-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-lg mr-3">
              <Wallet className="h-6 w-6 text-indigo-900" />
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">
                Wallet {currentIndex + 1}
              </h3>
              <div className="flex items-center">
                <span className="text-gray-300 text-xs">
                  {truncateAddress(publicKey)}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 text-gray-300 hover:text-white transition"
                >
                  {copySuccess ? (
                    <span className="text-green-300 text-xs">Copied!</span>
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleNextWallet}
              className="px-4 py-2 bg-white bg-opacity-10 backdrop-blur-md hover:bg-opacity-20 text-[#00164d] rounded-lg transition flex items-center"
            >
              <ChevronDown className="h-4 w-4 mr-1" />
              Switch
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-gray-300 text-sm mb-1">Total Balance</h4>
          <div className="flex items-end">
            {isLoading ? (
              <div className="animate-pulse h-10 w-32 bg-white bg-opacity-10 rounded"></div>
            ) : (
              <>
                <span className="text-white text-3xl font-bold">
                  {balance !== null ? balance.toFixed(4) : "0.0000"}
                </span>
                <span className="text-white text-xl ml-2 font-medium">SOL</span>
              </>
            )}
          </div>
          <div className="text-gray-300 text-sm mt-1">
            {balance !== null && balance > 0
              ? "≈ $" + (balance * 30).toFixed(2) + " USD"
              : "≈ $0.00 USD"}
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 py-2.5 bg-white bg-opacity-10 backdrop-blur-md hover:bg-opacity-20 text-[#00164d] rounded-lg transition flex items-center justify-center">
            <span className="mr-2">Send</span>
            <ArrowRightLeft className="h-4 w-4" />
          </button>
          <button className="flex-1 py-2.5 bg-white bg-opacity-10 backdrop-blur-md hover:bg-opacity-20 text-[#00164d] rounded-lg transition flex items-center justify-center">
            <span className="mr-2">Receive</span>
            <ClipboardCopy className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === "assets"
                ? "text-[#00164d] border-b-2 border-[#00164d]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("assets")}
          >
            Assets
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === "activity"
                ? "text-[#00164d] border-b-2 border-[#00164d]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm focus:outline-none ${
              activeTab === "nfts"
                ? "text-[#00164d] border-b-2 border-[#00164d]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("nfts")}
          >
            NFTs
          </button>
        </div>

        {activeTab === "assets" && (
          <div className="p-6">
            <div className="flex items-center p-4 border border-gray-100 rounded-lg mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-[#00164d] font-bold">SOL</span>
              </div>
              <div className="flex-1">
                <h4 className="text-[#00164d] font-medium">Solana</h4>
                <p className="text-gray-500 text-sm">SOL</p>
              </div>
              <div className="text-right">
                <div className="text-[#00164d] font-medium">
                  {balance !== null ? balance.toFixed(9) : "0.000000000"} SOL
                </div>
                <div className="text-gray-500 text-sm">
                  {balance !== null && balance > 0
                    ? "≈ $" + (balance * 30).toFixed(2)
                    : "≈ $0.00"}
                </div>
              </div>
            </div>

            <div className="text-center py-8 text-gray-500">
              <p>No other tokens found in this wallet</p>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="p-6 text-center py-16 px-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <BarChart4 className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-[#00164d] font-medium mb-2">
              No transactions yet
            </h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Transactions for this wallet will appear here
            </p>
          </div>
        )}

        {activeTab === "nfts" && (
          <div className="p-6 text-center py-16 px-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Settings className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-[#00164d] font-medium mb-2">No NFTs found</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              NFTs for this wallet will appear here
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-[#00164d] font-medium">{currentIndex}</span>
          </div>
          <div className="flex-1">
            <h4 className="text-[#00164d] font-medium">Wallet Details</h4>
            <p className="text-gray-500 text-sm truncate">
              {publicKey || "Loading..."}
            </p>
          </div>
          <a
            href={`https://explorer.solana.com/address/${publicKey}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition flex items-center"
          >
            <span className="mr-1 text-sm">Explorer</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-4">
          <button
            onClick={handleNextWallet}
            className="w-full px-4 py-3 bg-[#00164d] text-white rounded-lg hover:bg-opacity-90 transition"
          >
            Generate Next Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default WalletSection;
