import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./App.css";
import "./styles/css/main.css";
import Page from "./components/Page";
import { UserProvider } from "./contexts/users";
import { PostProvider } from "./contexts/post";
function App() {
  return (
    <UserProvider>
      <PostProvider>
        <div className="container">
          <Page />
        </div>
      </PostProvider>
    </UserProvider>
  );
}

export default App;
