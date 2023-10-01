import './App.css';
import './variables.css';
import {Header} from './components/Header';
import { ListCommits } from './components/ListCommits';
import { ResumeOptions } from './components/ResumeOptions';

function App() {

  return (
    <div className="App">
      <Header/>
      <ResumeOptions/>
      <ListCommits/>
    </div>
  );
}

export default App;
