import { useAppDispatch, useAppSelector } from "./app/hooks";

// Import Action creators
import { getAge, getName } from "./features/user/selectors";
import { doubledAge } from "./features/user/actions";

function App() {
  const dispatch = useAppDispatch();

  const name = useAppSelector(getName);
  const age = useAppSelector(getAge);
  const handleClick = () => dispatch(doubledAge(2));

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello {name}, You are now {age}
        </p>
        <button type="button" onClick={handleClick}>
          Double your age
        </button>
      </header>
    </div>
  );
}

export default App;
