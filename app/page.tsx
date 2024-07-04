import dynamic from "next/dynamic";
const Form = dynamic(() => import("./components/Form"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div className="flex justify-center">

      <Form />
      </div>
    </div>
  );
}
