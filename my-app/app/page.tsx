import Banner from "./component/sections/banner/Banner";
import DiscoverSection from "./component/sections/discoverSection/DiscoverSection";
import Gift from "./component/sections/gift/Gift";
import Products from "./component/sections/products/Products";

export default function Home() {
  return (
    <div>
      <DiscoverSection />
      <Products />
      <Banner />
      <Gift />
    </div>
  );
}
