import './App.css';
import MemesList from './meme_list';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MemesList />
    </QueryClientProvider>
  );
}

export default App;
