"use client"
import Image from "next/image";

export default function Home() {

    const requestDiscogsToken = async () => {
        try {
            const discogsOauthResponse = await fetch('/api/discogs/auth', {
                method: 'GET'
            });
            const discogsAuthRedirectUrl = (await discogsOauthResponse.json()).redirectUrl;

            if (discogsAuthRedirectUrl) {
                window.location.href = discogsAuthRedirectUrl;
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-12 justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex flex-row. items-center gap-8">
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


                <div className="pl-2.5 flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        Dónde quieres comprar música?
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        Identifícate con una de estas plataformas.
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
                </div>
            </main>
        </div>
    );
}
