import Articles from "@/components/Articles";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-between py-5 px-3">
      <Articles />
    </main>
  );
}
