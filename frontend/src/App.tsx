import ToasterComponent from './components/layout/Toaster';
import GlobalStyle from './global/styles';
import AppRoutes from './routes';

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRoutes />
      <ToasterComponent />
    </>
  );
}

export default App;
