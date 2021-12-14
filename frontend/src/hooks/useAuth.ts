import { useContext } from 'react';
import { userContext } from '../shared/context/user';

function useAuth() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
}

export default useAuth;
