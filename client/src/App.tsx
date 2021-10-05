import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Profile } from "./features/user/components/profile";

// Import Action creators
// import { getAge, getName } from "./features/user/selectors";
// import { doubledAge } from "./features/user/actions";

function App() {
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <Profile></Profile>
      </header>
    </div>
  );
}

export default App;
