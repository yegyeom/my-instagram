import "./App.css";
import "./styles/css/main.css";
import Page from "./components/Page";
import { UserProvider } from "./contexts/users";

function App() {
  return (
    <UserProvider value={{}}>
      <div className="container">
        <Page />
      </div>
    </UserProvider>
  );
}

export default App;
