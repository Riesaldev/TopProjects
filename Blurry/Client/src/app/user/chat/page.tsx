"use client";

import { Suspense, useState } from "react";
import Button from "@/components/Button";
import ReportForm from "@/components/ReportForm";
import { useSearchParams } from "next/navigation";
import { ChatBox } from '@/components/ChatBox';

function ChatContent() {
  const [showReport, setShowReport] = useState(false);
  const searchParams = useSearchParams();
  const contactId: string = searchParams?.get("contactId") || "";
  const userId: string = searchParams?.get("userId") || "";
  const jwt: string = searchParams?.get("jwt") || "";

  return (
    <div>
      <h2>Chat en tiempo real</h2>
      <ChatBox userId={userId} contactId={contactId} jwt={jwt} />
      <ReportForm />
      {showReport && <ReportForm />}
      <Button onClick={() => setShowReport(!showReport)}>Reportar</Button>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Cargando chat...</div>}>
      <ChatContent />
    </Suspense>
  );
}