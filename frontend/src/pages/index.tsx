import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useWallet } from '@/hooks/useWallet'
import { useICM } from '@/hooks/useICM'
import { WalletConnector } from '@/components/WalletConnector'
import { ICMDashboard } from '@/components/ICMDashboard'
import { ICMSendForm } from '@/components/ICMSendForm'
import { ICMHistory } from '@/components/ICMHistory'
import { ICMAnalytics } from '@/components/ICMAnalytics'
import { SubnetSelector } from '@/components/SubnetSelector'
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
  const { isConnected, address } = useWallet()
  const { messages, sendMessage, isLoading } = useICM()
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>AvalancheICMDashboard - Avalanche ICM Dashboard</title>
        <meta name="description" content="Complete Avalanche Inter-Chain Messaging Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="top-right" />

      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🏔️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AvalancheICMDashboard</h1>
                <p className="text-sm text-gray-600">Avalanche ICM Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <SubnetSelector />
              <WalletConnector />
            </div>
          </div>
          
          {isConnected && (
            <nav className="flex space-x-8 -mb-px">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard' 
                    ? 'border-red-500 text-red-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('send')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'send' 
                    ? 'border-red-500 text-red-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Send Message
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history' 
                    ? 'border-red-500 text-red-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics' 
                    ? 'border-red-500 text-red-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analytics
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!isConnected ? (
          <div className="text-center py-20">
            <div className="mx-auto max-w-md">
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-4xl">🏔️</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Avalanche ICM
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Connect your wallet to start sending cross-chain messages between Avalanche subnets
              </p>
              <WalletConnector />
            </div>
          </div>
        ) : (
          <div className="px-4 sm:px-0">
            {activeTab === 'dashboard' && <ICMDashboard />}
            {activeTab === 'send' && <ICMSendForm />}
            {activeTab === 'history' && <ICMHistory />}
            {activeTab === 'analytics' && <ICMAnalytics />}
          </div>
        )}
      </main>
    </div>
  )
}