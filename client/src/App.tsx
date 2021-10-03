import { useState } from "react";
import { getAge } from "./features/user/selectors";
import { doubledAge } from "./features/user/actions";
import { useAppDispatch, useAppSelector } from "./app/hooks";

function App() {
  const [count, setCount] = useState(0);

  const dispatch = useAppDispatch();
  const age = useAppSelector(getAge);

  const handleClick = () => dispatch(doubledAge(2));

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button type="button" onClick={handleClick}>
            count is: {age}
          </button>
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
