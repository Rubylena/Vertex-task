import dynamic from "next/dynamic";
const Form = dynamic(() => import("./components/Form"), { ssr: false });

export default function Home() {
  return (
    <>
      <Form />
    </>
  );
}
