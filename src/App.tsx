import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import routes from './routes';
import { toastConfig } from './utils/consts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <ToastContainer {...toastConfig} />
    </BrowserRouter>
  );
}
