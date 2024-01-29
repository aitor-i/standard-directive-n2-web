import { useEffect, useState } from 'react';
import './toast.css'


interface Props {

  message: string;
  type: "t-success" | "t-neutral" | "t-warning" | "t-error"

}


export function Toast(props: Props) {

  const [toastState, setToastState] = useState<'idle' | 'toast' | 'toast-hide'>('idle')
  const { message, type } = props;

  useEffect(() => {
    setToastState('toast')

    setTimeout(() => {
      setToastState('toast-hide')
    }, 3000);
  }, [props])

  return (
    <div className={`overflow-clip absolute w-80 h-16 ${toastState} p-2 rounded  top-4 right-4 ${type} `}>
      <p className="">{message}</p>
    </div>
  )
}
