import NavigationMenu from '@/components/NavigationMenu/NavigationMenu'

import Image from 'next/image'

import AddEventImg from '../../../public/media/Calendar-add-event.jpg'
import CompleteTasktImg from '../../../public/media/Events-done.jpg'

export function HomePage() {
  return (
    <>
      <main className=' h-screen'>
        <div className='fixed top-4 right-4'>
          <NavigationMenu />
        </div>
        <div className='p-4 pt-12 flex flex-col gap-8'>
          <h1 >Standard directive number 2</h1>
          <section>
            <h2 >Be the general</h2>
            <h2 >Be the soldier</h2>
          </section>
        </div>
      </main>

      <main className=' h-screen p-4 flex flex-col gap-4'>
        <h2>Organize your tasks and give them a dicrete time space</h2>
        <div className='w-2/3 self-end'>
          <Image alt='sd' src={AddEventImg} />
        </div>
      </main >
      <main className=' h-screen p-4 flex flex-col gap-8'>
        <h2>Visualize your scheduled events and check  them while completing!</h2>
        <div className='w-2/3 self-end'>
          <Image alt='sd' src={CompleteTasktImg} />
        </div>
      </main>
    </>
  )
}
