import Recommended from "./homePage/recommended";
import Trending from "./homePage/trending";

const Home = () => {
  return (
    <div className="xl:ml-28 lg:mr-2 md:ml-28 md:mr-2 sm:mx-2 sm:mt-14 mt-16"> 
      <Trending />
      <Recommended />
    </div>
  );
}

export default Home;
