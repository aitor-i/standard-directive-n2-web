'use client'

import { isValidEmail } from '@/application/isValidEmail/isValidEmail';
import Footer from '@/components/Footer/Footer';
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu'
import { Toast } from '@/components/Toast/Toast';
import { FetchParams, useFetch } from '@/hooks/useFetch/useFeltch'
import Link from 'next/link';

import { redirect } from "next/navigation"

interface LoginResponse {
  message: string,
  token?: string,
  username?: string,
  calendar: null
}

export default function LoginPage() {
  const { fetcher, response, fetchingStatus, responseObject } = useFetch<LoginResponse>();
  const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username")?.valueOf() ?? "";
    const password = formData.get("password")?.valueOf() ?? "";

    const body = isValidEmail(username.toString()) ? { email: username, password } : { username, password }

    const fetchParams: FetchParams = {
      url: `${baseUrl}/users/login`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body

    }

    fetcher(fetchParams)

  }

  if (responseObject?.ok && response?.token) {
    window.localStorage.setItem("token", response.token);

    redirect("/calendar")
  }
  return (
    <section className=' flex flex-col h-screen'>
      <div className="fixed top-4 right-4">
        <NavigationMenu />
      </div>
      {response?.message && <Toast message={response.message} type={responseObject?.ok ? 't-success' : 't-error'} />}
      <div className='flex mt-20 flex-1  self-center flex-col w-full p-4 md:w-2/3 lg:w-1/3'>

        <h4>Login</h4>
        <form onSubmit={submitHandler} className=' flex flex-col gap-4'>
          <section className='flex-col flex'>
            <label>Username</label>
            <input type="text" name="username" />
          </section>
          <section className='flex-col flex'>
            <label>Password</label>
            <input type="password" name="password" />
          </section>

          <Link className='text-xs text-blue-600 border-blue-600 border-b w-fit' href={"/register"}>Register</Link>
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
