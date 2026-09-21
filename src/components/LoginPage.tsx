import { useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkUserStatus, createUser, logInUser } from "../utils/api";
import { useStore } from "../context/StoreContext";


export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toastRef, setUser } = useStore()
  const [currentState, setCurrentState] = useState(true)
  const formRef = useRef<HTMLFormElement | null>(null);
  const from = (location.state as { from?: string } | null)?.from || '/';
  const loginFetch = useRef(true)

  useLayoutEffect(() => {
    if (loginFetch.current) {
      (async () => {
        const user = await checkUserStatus()
        if (user?.user) {
          navigate("/")
        }
      })()
      loginFetch.current = false;
    }
  }, [])

  const submitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData.entries())
      console.log(data);
      try {
        let res;
        if (currentState) {
          res = await logInUser(data)
        } else {
          res = await createUser(data);
        }
        if (res?.user) {
          console.log(res);
          setUser(res?.user)
          toastRef.current?.show({
            message: res?.message,
            type: 'success',
            duration: 3000,
          });
          navigate(from, { replace: true });
        } else {
          toastRef.current?.show({
            message: res?.message,
            type: 'error',
            duration: 3000,
          });
        }
      } catch (error) {
        toastRef.current?.show({
          message: "Unexpected error occured",
          type: 'error',
          duration: 3000,
        });
      }
    }
  }

  const forgotPassword = () => {
  }

  return (
    <main className="min-h-screen bg-[#eaeded] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-end gap-0.5 rounded-sm px-1 py-1 hover:outline hover:outline-1 hover:outline-[#d5d9d9]"
            aria-label="Go to home"
          >
            <span className="relative pb-1 text-[24px] font-bold italic leading-none tracking-tight text-[#0f1111] sm:text-[28px]">
              amazon
              <svg
                aria-hidden
                className="absolute -bottom-0.5 left-[18px] h-[7px] w-[52px] text-[#ff9900] sm:left-[20px] sm:w-[60px]"
                viewBox="0 0 100 12"
                fill="none"
              >
                <path
                  d="M4 4c28 10 64 10 92-2"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M88 2l8 4-10 2"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="mb-1 hidden text-[12px] text-[#0f1111] sm:inline">.com</span>
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#d5d9d9] bg-white shadow-[0_18px_40px_rgba(15,17,17,0.08)]">
          <div className="grid md:grid-cols-[1.08fr_0.92fr]">
            <section className="bg-[#131921] px-6 py-8 text-white sm:px-8 lg:px-10 lg:py-10">
              <div className="inline-flex items-center rounded-full border border-[#febd69]/50 bg-[#232f3e] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#febd69]">
                Welcome back
              </div>

              <h1 className="mt-5 max-w-sm text-3xl font-bold leading-tight sm:text-4xl">
                Sign in to your account
              </h1>

              <p className="mt-3 max-w-md text-[15px] text-[#d5d9d9] sm:text-base">
                Manage orders, save items for later, and enjoy a faster checkout experience.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  'Track your orders in real time',
                  'Save favorites for your next purchase',
                  'Speed through checkout with your profile',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#febd69] text-sm font-bold text-[#131921]">
                      ✓
                    </span>
                    <span className="text-[15px] text-white/95">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="px-5 py-7 sm:px-7 lg:px-9 lg:py-10">
              <div className="mx-auto max-w-md">
                <div className="mb-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#565959]">
                    Account access
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-[#0f1111]">{currentState ? "Login" : "Signup"}</h2>
                </div>

                <form ref={formRef} className="space-y-5" onSubmit={submitForm} >
                  {!currentState && <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#0f1111]">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      className="w-full rounded-md border border-[#a6a6a6] bg-white px-3 py-3 text-[15px] text-[#0f1111] outline-none transition focus:border-[#ff9900] focus:shadow-[0_0_0_3px_rgba(255,153,0,0.18)]"
                    />
                  </div>}
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#0f1111]">
                      Email or mobile number
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="hello@example.com"
                      className="w-full rounded-md border border-[#a6a6a6] bg-white px-3 py-3 text-[15px] text-[#0f1111] outline-none transition focus:border-[#ff9900] focus:shadow-[0_0_0_3px_rgba(255,153,0,0.18)]"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label htmlFor="password" className="text-sm font-medium text-[#0f1111]">
                        Password
                      </label>
                      <button onClick={forgotPassword} type="button" className="text-xs font-medium text-[#007185] hover:text-[#0f1111]">
                        Forgot password?
                      </button>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="password123"
                      className="w-full rounded-md border border-[#a6a6a6] bg-white px-3 py-3 text-[15px] text-[#0f1111] outline-none transition focus:border-[#ff9900] focus:shadow-[0_0_0_3px_rgba(255,153,0,0.18)]"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-sm text-[#0f1111]">
                    <input type="checkbox" name="rememberMe" className="h-4 w-4 accent-[#ffd814]" />
                    Keep me signed in
                  </label>

                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#ffd814] px-4 py-3 text-[15px] font-medium text-[#0f1111] shadow-[0_2px_0_rgba(15,17,17,0.15)] transition hover:bg-[#f7ca00]"
                  >
                    {currentState ? "Sign in" : "Sign up"}
                  </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#d5d9d9]" />
                  <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#565959]">
                    {currentState ? "New here" : "OR"}
                  </span>
                  <div className="h-px flex-1 bg-[#d5d9d9]" />
                </div>

                <button
                  type="button"
                  className="w-full rounded-md border border-[#d5d9d9] bg-white px-4 py-3 text-[15px] font-medium text-[#0f1111] hover:bg-[#f7fafa]"
                  onClick={() => setCurrentState(!currentState)}
                >
                  {currentState ? "Create your Amazon account" : "Login to your Amazon account"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
