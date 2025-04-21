"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

function Header() {
    const router = useRouter()
    
    return (
        <div className='container mx-auto px-4 py-16 md:py-24'>
            <div className='max-w-4xl mx-auto text-center'>
                <h1 className='text-5xl md:text-7xl text-[#00164d] font-bold leading-tight'>
                    The Most Secure Web Wallet For Your Digital Assets
                </h1>
                
                <p className='text-lg md:text-xl text-[#00164d]/80 mt-8 max-w-2xl mx-auto'>
                    Secure, fast, and accessible from anywhere. WalletX makes managing your digital assets simple and stress-free.
                </p>
                
                <div className='mt-10 md:mt-12'>
                    <button 
                        onClick={() => router.push('/wallet')} 
                        className='bg-[#00164d] hover:bg-[#002080] text-white text-xl md:text-2xl py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
