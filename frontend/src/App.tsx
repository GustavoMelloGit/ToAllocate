import ToasterComponent from './components/layout/Toaster';
import GlobalStyle from './global/styles';
import AppRoutes from './routes';
import UserContextProvider from './shared/context/user';

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
