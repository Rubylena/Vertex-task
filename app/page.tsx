import dynamic from "next/dynamic";
import Loading from "./loading";
const Form = dynamic(() => import("./components/Form"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Home() {
  return (
    <>
      <Form />
    </>
  );
}
