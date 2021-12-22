import ToasterComponent from './components/layout/Toaster';
import GlobalStyle from './global/styles';
import AppRoutes from './routes';
import UserContextProvider from './shared/context/user';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
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
