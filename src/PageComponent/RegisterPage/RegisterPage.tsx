import NavigationMenu from '@/components/NavigationMenu/NavigationMenu'
import { FetchParams, useFetch } from '@/hooks/useFetch/useFeltch'
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { redirect } from "next/navigation"
import { passwordValidation } from '@/application/passwordValidation/passwordValidation';
import { Toast } from '@/components/Toast/Toast';
import Footer from '@/components/Footer/Footer';

interface RegisterResponse {
  message: string,
  token?: string,
  username?: string,
  calendar: null
}


export default function RegisterPage(props: {}) {
  const { fetchingStatus, fetcher, response, responseObject } = useFetch<RegisterResponse>();
  const [errorMessage, setErrorMessage] = useState<String>()
  const passwordRef = useRef<HTMLInputElement>(null)
  const rePasswordRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    emailRef.current?.classList.remove("error")
    passwordRef.current?.classList.remove("error")
    rePasswordRef.current?.classList.remove("error")

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username")?.valueOf() ?? "";
    const password = formData.get("password")?.valueOf() ?? "";
    const rePassword = formData.get("confirm-password")?.valueOf() ?? "";
    const email = formData.get("email")?.valueOf() ?? "";
    const reEmail = formData.get("re-email")?.valueOf() ?? "";
    const code = formData.get("code")?.valueOf() ?? "";

    const passwordValidationResponse = passwordValidation(password.toString());

    if (email.toString() !== reEmail.toString()) {
      emailRef.current?.classList.add("error")
      return
    }

    if (password.toString() !== rePassword.toString() || !passwordValidationResponse.valid) {
      setErrorMessage(passwordValidationResponse.message)
      passwordRef.current?.classList.add("error")
      rePasswordRef.current?.classList.add("error")
      return
    }

    const fetchParams: FetchParams = {
      url: `${baseUrl}/users/register-user`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { username, password, email, code }

    }

    fetcher(fetchParams)
  }

  if (responseObject?.ok && response?.token) {
    window.localStorage.setItem("token", response.token);
    redirect("/calendar")
  }

  return (<section className='flex-1, flex flex-col  h-screen'>
    <div className="fixed top-4 right-4">
      <NavigationMenu />
    </div>
    {

      response?.message && <Toast type={responseObject?.ok ? 't-success' : 't-error'} message={response.message} />
    }
    <div className='flex mt-20 flex-1  self-center flex-col w-full p-4 md:w-2/3 lg:w-1/3'>

      <h4>Register</h4>
      <form onSubmit={submitHandler} className=' flex flex-col gap-4'>
        <section className='flex-col flex'>
          <label>Username</label>
          <input type="text" name="username" />
        </section>
        <section className='flex-col flex'>
          <label>Email</label>
          <input ref={emailRef} type="email" name="email" />
        </section>
        <section className='flex-col flex'>
          <label>Repeat email</label>
          <input ref={emailRef} type="email" name="re-email" />
        </section>
        <section className='flex-col flex'>
          <label>Password</label>
          <input ref={passwordRef} type="password" name="password" />
          {errorMessage && <p className='text-xs text-red-500'>{errorMessage}</p>}
        </section>
        <section className='flex-col flex'>
          <label>Confirm password</label>
          <input ref={rePasswordRef} type="password" name="confirm-password" />
        </section>
        <section className='flex-col flex'>
          <label>Code</label>
          <input type="text" name="code" />
        </section>

        <Link className='text-xs text-blue-600 border-blue-600 border-b w-fit' href={"/login"}>Login</Link>
        {fetchingStatus === "loading" ? 'Loading' :

          <section className='flex justify-end'>
            <button className='primary' type='submit'>Login</button>
          </section>
        }
      </form>
    </div>

    <Footer />
  </section>)
}
