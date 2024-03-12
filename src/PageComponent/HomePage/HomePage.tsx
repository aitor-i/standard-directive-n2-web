import React from 'react';
import Image from 'next/image';
import AddEventImg from '@/../public/media/Calendar-add-event.jpg';
import CompleteTaskImg from '@/../public/media/Events-done.jpg';
import { Roboto_Mono } from 'next/font/google'
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu';

const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
})


const HomePage = () => {
  return (
    <>
      <div className="fixed top-4 right-4">
        <NavigationMenu />
      </div>

      <h1 className={`p-4 mt-14 mx-auto w-full text-center ${robotoMono.className} text-6xl lg:text-7xl`}>Standard Directive Number 002</h1>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid max-w-3xl gap-6 mx-auto lg:gap-12 lg:max-w-5xl lg:grid-cols-2 lg:items-center lg:grid-flow-col lg:gap-12">
            <div className="space-y-4 order-last lg:order-first">
              <h2 className={robotoMono.className}>Be the General</h2>
              <h2 className={robotoMono.className}>Be the Soldier</h2>
              <i className='text-gray-700'>Jocko Willink</i>
            </div>
            <div className=" gap-4 min-[400px]  overflow-hidden rounded-s border-gray-800 card">
              <iframe className='rounded-s' width="580" height="315"
                src="https://www.youtube.com/embed/lqMthruPavU?si=WOS4whMaHMZuzjGc&amp;clip=UgkxOZYzF4_l3c61N5upjo5t82d7EXlwVx3r&amp;clipt=EIDoBxiR7Ak"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 px-0 lg:px-60">
        <div className="container px-4 md:px-6">
          <div className="grid max-w-3xl gap-6 mx-auto lg:gap-12 lg:max-w-5xl lg:grid-cols-1 lg:items-center lg:grid-flow-col ">
            <div className="space-y-4 ">
              <h2 style={robotoMono.style} className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Embrace the Power of Planning
              </h2>
              <p style={robotoMono.style} className=" font-sans text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-600">
                Discover how integrating a calendar into your routine can transform chaos into order, guiding you towards achieving your objectives with precision and discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid max-w-3xl gap-6 mx-auto lg:gap-12 lg:max-w-5xl lg:grid-cols-2 lg:items-center lg:grid-flow-col ">

            <div className="space-y-4 order-last lg:order-first">
              <h2 style={robotoMono.style} className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Organize Your Tasks and Allocate Specific Time Slots
              </h2>
              <p style={robotoMono.style} className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-600">
                Add events to your calendar to stay on top of your tasks. Planning ahead is the first step towards success.
              </p>
            </div>
            <div className=" gap-4 min-[400px] card overflow-hidden rounded-s">
              <Image alt="Add event illustration" src={AddEventImg} />
            </div>
          </div>
        </div>
      </section>


      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid max-w-3xl gap-6 mx-auto lg:gap-12 lg:max-w-5xl lg:grid-cols-2 lg:items-center lg:grid-flow-col ">

            <div className=" gap-4 min-[400px] card overflow-hidden rounded-s">
              <Image alt="Complete task illustration" src={CompleteTaskImg} />
            </div>

            <div className="space-y-4 order-last lg:order-last">
              <h2 style={robotoMono.style} className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Visualize Your Scheduled Events and Check Them While Completing!
              </h2>
              <p style={robotoMono.style} className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-600">
                Seeing your schedule visually helps reinforce your commitment to your tasks and goals. Check off completed tasks to track your progress and stay motivated.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="p-4 bg-gray-700 text-center">
        <p className='text-sm  text-white'>Planning and discipline are the bedrock of success. Start your journey today with our comprehensive calendar tool.</p>
      </footer>
    </>
  );
};

export default HomePage;
