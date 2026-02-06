"use client"
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    router.push('/init');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-8 mb-12">
          <div className="flex flex-row items-center gap-4">
            <Image
              className=""
              src="/axis-logo/thin-96.png"
              alt="Axis logo"
              width={100}
              height={20}
              priority
            />
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Axis
            </h1>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="h-12 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
              placeholder="Tu nombre de usuario"
            />
          </div>

          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="h-12 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
                placeholder="tu@email.com"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="h-12 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-full bg-foreground text-background font-medium transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </button>

          <div className="text-center pt-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
              {" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ username: "", email: "", password: "" });
                }}
                className="font-medium text-black dark:text-zinc-50 hover:underline transition-all"
              >
                {isLogin ? "Crear una cuenta" : "Iniciar sesión"}
              </button>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
