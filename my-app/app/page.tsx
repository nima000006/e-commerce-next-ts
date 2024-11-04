import BoxLine from "./component/boxLine/BoxLine";
import Text from "@/public/locales/en.json";
import Menu from "./component/menu/Menu";

export default function Home() {
  return (
    <div>
      <BoxLine
        className={`flex justify-center items-center h-[32px] text-white-normal bg-brown-normal text-[16px]`}
      >
        {Text.TEXT_ABOVE}
      </BoxLine>
      <Menu />
      <BoxLine
        className={`flex justify-center items-center bg-white-normal text-brown-normal h-[41px] text-[14px]`}
      >
        {Text.TEXT_UNDER}
      </BoxLine>
    </div>
  );
}
