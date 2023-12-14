import Link from "next/link";

export default function NavigationMenu() {
  return (
    <div className="flex gap-4">
      <Link href={"/"}>Home</Link>
      <Link href={"/calendar"}>Calendar</Link>
    </div>
  );
}
