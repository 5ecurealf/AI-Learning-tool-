// context/ThreadContext.tsx
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

// Define the shape of your state
interface State {
  threadId: string | null;
}

// Define action types
type Action = { type: "SET_THREAD_ID"; payload: string };

// Define the initial state
const initialState: State = {
  threadId: null,
};

// Create the reducer function
function threadReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_THREAD_ID":
      return { ...state, threadId: action.payload };
    default:
      return state;
  }
}

// Create the context
const ThreadStateContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

// Create a provider component
interface ThreadProviderProps {
  children: ReactNode;
}

export const ThreadProvider = ({ children }: ThreadProviderProps) => {
  const [state, dispatch] = useReducer(threadReducer, initialState);

  return (
    <ThreadStateContext.Provider value={{ state, dispatch }}>
      {children}
    </ThreadStateContext.Provider>
  );
};

// Create a custom hook to use the thread context
export const useThread = () => {
  const context = useContext(ThreadStateContext);
  if (!context) {
    throw new Error("useThread must be used within a ThreadProvider");
  }
  return context;
};
