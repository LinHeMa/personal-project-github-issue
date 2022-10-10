import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import IssueList from './components/IssuePage/IssueList';
import LabelContent from './components/labelContent/LabelContent';
import CreateIssueContainer from './components/CreateIssue/CreateIssueContainer';
import Repo from './components/repo/Repo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Repo />} />
          <Route path='labelcontent' element={<LabelContent />} />
          <Route path='issuelist' element={<IssueList />} />
          <Route path='createissue' element={<CreateIssueContainer />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>,
);
