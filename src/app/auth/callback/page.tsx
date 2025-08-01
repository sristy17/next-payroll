// src/app/auth/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

export default function Callback() {
  const router = useRouter();
  const supabase = createPagesBrowserClient();

  useEffect(() => {
    const handleRedirect = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/auth/login');
        console.error('No session found after redirect:', error);
      }
    };

    handleRedirect();
  }, [router, supabase]);

  return <p className="text-center mt-10">Redirecting...</p>;
}
