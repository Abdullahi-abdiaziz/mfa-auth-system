import Header from "../components/Header.jsx";
import {useSession} from "../contexts/SessionContext.jsx";

const HomePage = () => {
  const {user} = useSession()
  return <div className="w-full"> <Header />
  <div className={"text-center mt-32 text-black text-3xl"}>
    Welcome , {user.user.username}
  </div>
  </div>;
};

export default HomePage;
