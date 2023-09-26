"use client";

import { useEffect, useState } from "react";

import { deleteSubscription } from "../api/delete-subscription";
import { saveSubscription } from "../api/save-subscription";

if (!process.env.NEXT_PUBLIC_VAPID_KEY) {
  throw new Error("Missing Env Variable NEXT_PUBLIC_VAPID_KEY");
}

type SubscriptionProps = {
  subscribed: boolean;
};

export function Subscription({ subscribed }: SubscriptionProps) {
  const [isSubscribed, setIsSubscribed] = useState(subscribed);
  const [loading, setLoading] = useState(false);

  const [serviceWorker, setServiceWorker] =
    useState<ServiceWorkerRegistration>();

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });

    setServiceWorker(registration);
  }

  // register serviceworker in client
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      registerServiceWorker();
    }
  }, []);

  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async function subscribe() {
    if (!serviceWorker) {
      return;
    }

    const applicationServerKey = urlBase64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_KEY ?? ""
    );

    const subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });

    await saveSubscription(JSON.stringify(subscription));
  }

  async function handleClick() {
    setLoading(true);

    if (subscribed) {
      await deleteSubscription();
      setIsSubscribed(false);
    } else {
      await subscribe();
      setIsSubscribed(true);
    }

    setLoading(false);
  }

  if (!serviceWorker) {
    return null;
  }

  return (
    <button
      className="rounded-full bg-teal-300 w-8 h-8 flex items-center justify-center"
      disabled={loading}
      onClick={handleClick}
    >
      {isSubscribed ? (
        <svg
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z" />
        </svg>
      ) : (
        <svg
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm9-4v-2a.996.996 0 0 0-.293-.707L19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258c-1.323.364-2.463 1.128-3.346 2.127L3.707 2.293 2.293 3.707l18 18 1.414-1.414-1.362-1.362A.993.993 0 0 0 21 18zM12 5c2.757 0 5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17h-.586L8.207 6.793C9.12 5.705 10.471 5 12 5zm-5.293 9.707A.996.996 0 0 0 7 14v-2.879L5.068 9.189C5.037 9.457 5 9.724 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h10.879l-2-2H5v-.586l1.707-1.707z" />
        </svg>
      )}
    </button>
  );
}
