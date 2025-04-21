import React, { useEffect, useState } from "react";
import { generateMnemonic } from "bip39";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Copy, RefreshCw } from "lucide-react";
import WalletSection from "./WalletSection";

function CreateWallet() {
  const [mnemonic, setMnemonic] = useState("");
  const [seedPhrase, setSeedPhrase] = useState(false);
  const [copied, setCopied] = useState(false);

    useEffect(() => {
        const ifSeedPhraseExists = localStorage.getItem("seedPhrase");
        if (ifSeedPhraseExists) {
            setSeedPhrase(true);
        }
        const ifMnemonicExists = localStorage.getItem("mnemonic");
        const wallet = localStorage.getItem("wallet");
        if (wallet === "new" && !ifMnemonicExists) {
            const mnemonic = generateMnemonic();
            setMnemonic(mnemonic);
            localStorage.setItem("mnemonic", mnemonic);
        } else if (wallet === "new" && ifMnemonicExists) {
            setMnemonic(ifMnemonicExists);
        }
    }, []);


  const handleCopyMnemonic = () => {
    navigator.clipboard.writeText(mnemonic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateNew = () => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    localStorage.setItem("mnemonic", newMnemonic);
    setCopied(false);
  };

  return (
    <>
    {!seedPhrase && (
    <div className="flex flex-col items-center justify-center p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2 text-[#00164d]">Create New Wallet</h1>
        <p className="text-gray-600 max-w-2xl">
          Below is your unique 12-word recovery phrase. Write it down and store it in a secure location. 
          You'll need this to recover your wallet if you lose access.
        </p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-[#00164d]">Seed Phrase</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGenerateNew}
            className="text-xs flex items-center gap-1 text-[#00164d]"
            >
            <RefreshCw size={14} />
            Generate New
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full mb-6">
          {mnemonic.split(" ").map((word, index) => (
              <div key={index} className="bg-[#00164d] p-3 rounded-md shadow flex items-center">
              <span className="text-white/70 mr-2 text-sm w-5">{index + 1}.</span>
              <span className="font-medium text-white">{word}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 w-full">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Never share your seed phrase with anyone. Anyone with access to this phrase 
                  will have complete control over your wallet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-8 gap-4">
        <Button
          className="bg-[#00164d] text-white px-6 py-2 flex items-center gap-2"
          onClick={handleCopyMnemonic}
          >
          {copied ? (
              <>
              <CheckCircle size={18} />
              Copied!
            </>
          ) : (
              <>
              <Copy size={18} />
              Copy Seed Phrase
            </>
          )}
        </Button>
        
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => {
            setSeedPhrase(true);
            localStorage.setItem("seedPhrase", "true");
          }}
          >
          I've Saved My Phrase
        </Button>
      </div>
    </div>
    )}
    {seedPhrase && (
        <div className="flex flex-col items-center justify-center p-6 max-w-4xl mx-auto">
            <WalletSection />
        </div>
    )}
    </>
  );
}

export default CreateWallet;
