'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/signin?mode=login');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FBF8] via-[#F8FCFB] to-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#00A389] border-t-transparent animate-spin" />
        <p className="text-xs font-mono text-slate-500">Redirecting to Scientific Portal...</p>
      </div>
    </div>
  );
}
