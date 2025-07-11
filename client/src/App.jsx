import FlowCanvas from './components/FlowCanvas';
import BlockPanel from './components/BlockPanel'; 
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <BlockPanel />       
      <FlowCanvas />      
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
