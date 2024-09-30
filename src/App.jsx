import HomePageHeader from "./pages/Home/HomePageHeader";
import Banner from "./pages/Home/Banner/Banner";
import SoftwareInfo from "./pages/Home/SoftwareInfo/SoftwareInfo";
import AppFeatures from "./pages/Home/AppFeatures/AppFeatures";
import BusinessMonitoring from "./pages/Home/BusinessMonitoring/BusinessMonitoring";
import DemoVideo from "./pages/Home/DemoVideo/DemoVideo";
import SoftwareUser from "./pages/Home/SoftwareUser/SoftwareUser";
import UserPriceList from "./pages/Home/UserPriceList/UserPriceList";
import HomepageFooter from "./pages/Home/HomepageFooter/HomepageFooter";

function App() {
  return (
    <div>
      <HomePageHeader></HomePageHeader>
      <Banner></Banner>
      <SoftwareInfo></SoftwareInfo>
      <AppFeatures></AppFeatures>
      <BusinessMonitoring></BusinessMonitoring>
      <DemoVideo></DemoVideo>
      <SoftwareUser></SoftwareUser>
      <UserPriceList></UserPriceList>
      <HomepageFooter></HomepageFooter>
    </div>
  );
}


export default App;
