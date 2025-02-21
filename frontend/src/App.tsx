import { ConnectKitButton } from "connectkit";
import "./App.css";
import { Web3Provider } from "./Web3Provider";
import { List } from "./components/List";
import { Create } from "./components/Create";

function App() {
  return (
    <Web3Provider>
      <div className="flex flex-col border-collapse">
        <div className="w-full m-5 flex flex-row items-center gap-4">
          <span>Connect wallet:</span>
          <span>
            <ConnectKitButton />
          </span>
        </div>
        <div className="divider"></div>
        <div className="w-full m-5">
          <List />
        </div>
        <div className="divider"></div>
        <div className="w-full m-5">
          <Create />
        </div>
      </div>
    </Web3Provider>
  );
}

export default App;
