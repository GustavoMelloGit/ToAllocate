import { Toaster } from 'react-hot-toast';

export default function ToasterComponent(): JSX.Element {
  return (
    <Toaster
      toastOptions={{
        style: {
          fontSize: '1.4rem',
        },
      }}
    />
  );
}
