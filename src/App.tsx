import TodoList from './components/TodoList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';

// const options = {
//   defaultOptions: {
//     queries: {
//       retry: 3,
//       gcTime: 300_000, // 5m(cache Time)
//       staleTime: 10 * 1000, // 10s
//       refetchOnWindowFocus: false,
//       refetchOnReconnect: false,
//       refetchOnMount: false,
//     },
//   },
// };

// giving options globally to all queries
// please go with the default options expect the staleTime
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoForm />
      <TodoList />
      {/* <PostList /> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
