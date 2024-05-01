import View from './View';
import { QueryClient, QueryClientProvider } from 'react-query';
import './css/default.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <View />
      </div>
    </QueryClientProvider>
  );
}

export default App;
