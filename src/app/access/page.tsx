'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";
import { useEffect } from 'react';
import { confirmDiscogsAuth } from './helper';


export default function PaginaBusqueda() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get('oauth_token');
        const verifier = searchParams.get('oauth_verifier');

        if(accessToken && verifier) {
            confirmDiscogsAuth(accessToken, verifier).then(() => router.push('/access'));
        }
    }, [searchParams, router])

    const oauthYoutube= async () => {
        try {

        } catch {

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
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-white dark:text-zinc-5"> Axis </h1>
                </div>


                <div className="pl-2.5 flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        Successfully authenticated on Discogs
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        Now add another Platform to get Playlists to buy.
                    </p>
                </div>
                <div className="pl-2  w-full flex flex-col gap-4 text-base font-medium sm:flex-row">
                    <button
                        className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
                        rel="noopener noreferrer"
                        onClick={oauthYoutube}
                    >
                        <Image
                            className=""
                            src="/youtube-icon.webp"
                            alt="YouTube logomark"
                            width={20}
                            height={20}
                        />
                        Add YouTube
                    </button>

                    <button
                        className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className=""
                            src="/spotify-icon.webp"
                            alt="YouTube logomark"
                            width={20}
                            height={20}
                        />
                        Add Spotify
                    </button>
                </div>
            </main>
        </div>
    )
}
