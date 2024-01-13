import NavigationMenu from '@/components/NavigationMenu/NavigationMenu'
import { FetchParams, useFetch } from '@/hooks/useFetch/useFeltch'

import { redirect } from "next/navigation"
export const LoginPage = () => {
  const { fetcher, response, fetchingStatus, responseObject } = useFetch();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username")?.valueOf() ?? "";
    const password = formData.get("password")?.valueOf() ?? "";

    const fetchParams: FetchParams = {
      url: "http://localhost:4040/users/login",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { username, password }

    }

    fetcher(fetchParams)

  }

  if (responseObject?.ok) redirect("/calendar")
  return (<section className='flex-1, flex flex-col  h-screen'>
    <NavigationMenu />
    <div className='flex mt-20 flex-1  self-center flex-col w-1/3'>

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

        <section className='flex justify-end'>
          <button className='primary' type='submit'>Login</button>
        </section>
      </form>
    </div>

  </section>)
}