import View from './View';
import { QueryClient, QueryClientProvider } from 'react-query';
import './css/default.css';
import {RecoilRoot} from "recoil";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <View />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
