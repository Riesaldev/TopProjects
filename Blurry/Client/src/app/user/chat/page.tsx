"use client";

import { Suspense, useState, useEffect } from "react";
import ReportForm from "@/components/ReportForm";
import { useSearchParams } from "next/navigation";
import { ChatBox } from '@/components/ChatBox';
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, AlertTriangle, X } from "lucide-react";
import Button from "@/components/Button";
import ViewState from "@/components/ViewState";

function ChatContent() {
  const [showReport, setShowReport] = useState(false);
  const searchParams = useSearchParams();
  const contactId: string = searchParams?.get("contactId") || "SYS-GUEST";
  const userId: string = searchParams?.get("userId") || "SYS-DEV";
  const jwt: string = searchParams?.get("jwt") || "dev-token-xyz";

  return (
    <main className="min-h-screen bg-zinc-950 text-slate-200 font-sans relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-zinc-950 to-zinc-950 -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/5 blur-[120px] rounded-full -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-lg flex flex-col h-[85vh] relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4 glass-panel p-4 rounded-2xl border border-zinc-800/50 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary-500/20 p-2.5 rounded-xl border border-primary-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <MessageSquare className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-white m-0 leading-none">Secure Link</h2>
              <p className="text-[10px] text-primary-400 font-bold tracking-widest uppercase mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" /> Encrypted Channel
              </p>
            </div>
          </div>

          <button 
            onClick={() => setShowReport(!showReport)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/50 transition-all font-bold text-xs uppercase tracking-wider group"
          >
            <AlertTriangle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /> Report
          </button>
        </motion.div>

        {/* Chat UI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 w-full h-full relative"
        >
          <ChatBox userId={userId} contactId={contactId} jwt={jwt} />
        </motion.div>

      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {showReport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setShowReport(false)}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white bg-zinc-800/50 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                <div className="bg-red-500/20 p-3 rounded-2xl border border-red-500/30">
                  <AlertTriangle className="w-6 h-6 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">File Incident Report</h3>
                  <p className="text-xs text-zinc-400 font-medium">Protocol for hostile behaviors.</p>
                </div>
              </div>
              
              <ReportForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <ViewState variant="loading" title="Establishing connection" description="Inicializando canal seguro de chat." className="max-w-md" />
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}