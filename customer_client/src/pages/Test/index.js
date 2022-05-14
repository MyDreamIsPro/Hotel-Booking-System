import Page from "../../components/Page";
import Lottie from "react-lottie-player";
import lottieJson from "../../__MOCK__/lottie/complete.json";
export default function Test() {
  return (
    <Page title="TEST | Tuanvq ">
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: 200, height: 200 }}
      />
    </Page>
  );
}
