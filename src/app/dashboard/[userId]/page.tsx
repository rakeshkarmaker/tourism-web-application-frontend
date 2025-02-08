


//Dashboard
'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function DashboardIndex() {
  const router = useRouter();
  const { userId } = useParams();

  useEffect(() => {
    // Use router.replace so that the navigation does not add a new history entry.
    router.replace(`/dashboard/${userId}/overview`);
  }, [router, userId]);

  return <p>Redirecting to Overview...</p>;
}
