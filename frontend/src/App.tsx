import ToasterComponent from './components/layout/Toaster';
import GlobalStyle from './global/styles';
import AppRoutes from './routes';
import UserContextProvider from './shared/context/user';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth';
import { decode } from 'jsonwebtoken';
import { IEmployeeModel } from './models/user/employee';

function App() {
  const auth = useAuth();
  const { setUser } = auth;

  useEffect(() => {
    const token = localStorage.getItem('@toAllocate:token');
    if (token && Object.keys(auth).length > 0) {
      const user = decode(token) as IEmployeeModel;
      if (user) {
        setUser(user);
      }
    }
  }, [auth, setUser]);

  return (
    <>
      <GlobalStyle />
      <UserContextProvider>
        <AppRoutes />
      </UserContextProvider>
      <ToasterComponent />
    </>
  );
}

export default App;
