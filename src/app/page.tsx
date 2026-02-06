"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { randomInt } from "node:crypto";
import { useState } from "react";



export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const requestDiscogsToken = async () => {
    const timestamp = Date.now();

    const newTab = window.open("", "_blank");

    try {
      const discogsOauthResponse = await fetch('/api/discogs/auth', {
        method: 'GET'
      });
      const discogsAuthRedirectUrl = (await discogsOauthResponse.json()).redirectUrl;

      if (newTab) {
        newTab.location.href = discogsAuthRedirectUrl
      }

    } catch (err) {
      newTab?.close();
    }
  }

  const getDiscogsAccess = async () => {
    const timestamp = Date.now();

    try {
      const discogsOauthResponse = await fetch('/api/discogs/access', {
        method: 'GET'
      });
      const discogsAuthRedirectUrl = (await discogsOauthResponse.json());

      console.log(discogsAuthRedirectUrl)

    } catch (err) {
      return;
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-row. items-center">
          <Image
            className=""
            src="/axis-logo/thin-96.png"
            alt="Axis logo"
            width={100}
            height={20}
            priority
          />
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-white dark:text-zinc-5">Welcome to Axis   </h1>
        </div>


        <div className="pl-2.5 flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, sign in on Discogs.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Work in Progress: More platforms will be added soon.
          </p>
        </div>
        <div className="pl-2 flex flex-col gap-4 text-base font-medium sm:flex-row">
          <button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            rel="noopener noreferrer"
            onClick={requestDiscogsToken}
          >
            <Image
              className=""
              src="/discogs-logo.webp"
              alt="Discogs logomark"
              width={20}
              height={20}
            />
            Sign in
          </button>

          <button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            rel="noopener noreferrer"
            onClick={getDiscogsAccess}
          >
            <Image
              className=""
              src="/axis-logo/black-48.png"
              alt="Discogs logomark"
              width={20}
              height={20}
            />
            Access
          </button>
        </div>
      </main>
    </div>
  );
}
