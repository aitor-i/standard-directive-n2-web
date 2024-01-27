import './toast.css'


interface Props {

  message: string;
  type: "success" | "neutral" | "warning" | "error"

}
export function Toast({ message, type }: Props) {

  return (
    <div className={`overflow-clip absolute w-80 h-16 toast p-2 rounded  top-4 right-4 ${type} `}>
      <p className="">{message}</p>
    </div>
  )
}
