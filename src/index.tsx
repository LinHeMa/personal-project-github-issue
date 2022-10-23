import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import './index.css';
import ErrorPage from './pages/ErrorPage';

const Repo = React.lazy(() => import('./components/Repo/Repo'));
const LabelContent = React.lazy(
  () => import('./components/LabelContent/LabelContent'),
);
const IssueList = React.lazy(
  () => import('./components/IssueListPage/IssueList'),
);
const CreateIssueContainer = React.lazy(
  () => import('./components/CreateIssue/CreateIssueContainer'),
);
const NewIssueContainer = React.lazy(
  () => import('./components/IssuePage/NewIssueContainer'),
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Repo />} />
            <Route path='labelcontent' element={<LabelContent />} />
            <Route path='issuelist' element={<IssueList />} />
            <Route path='createissue' element={<CreateIssueContainer />} />
            <Route path='newIssue' element={<NewIssueContainer />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Provider>
    </Suspense>
  </BrowserRouter>,
);
