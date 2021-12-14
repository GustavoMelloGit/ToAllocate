import { createContext, useContext, useState } from 'react';
import { ILoginAuthenticationForm } from '../../models/authentication/form';
import { IEmployeeModel } from '../../models/user/employee';

interface IAuthContext {
  user: IEmployeeModel | undefined;
  isAuthenticated: boolean;
  login(form: ILoginAuthenticationForm, callback: VoidFunction): Promise<void>;
  logout(): void;
}

interface UserContextProps {
  children: React.ReactNode;
}

interface AuthState {
  user: IEmployeeModel | undefined;
  token: string;
}

export const userContext = createContext<IAuthContext>({} as IAuthContext);

const BASE_URL: string = process.env.REACT_APP_BASE_URL as string;

const UserContextProvider: React.FC<UserContextProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  async function userLogin(
    entry: ILoginAuthenticationForm,
    callback: VoidFunction
  ) {
    try {
      const response = await fetch(`${BASE_URL}/funcionarios`);
      const data: IEmployeeModel[] = await response.json();
      const employeeEmail = data.find((user) => user.email === entry.email);

      if (employeeEmail && employeeEmail.password === entry.password) {
        setData({
          user: employeeEmail,
          token: 'token',
        });
        setisAuthenticated(true);
        callback();
        return;
      }
      throw new Error('Usuário ou senha inválidos');
    } catch (e: any) {
      throw new Error(e);
    }
  }

  return (
    <userContext.Provider
      value={{
        login: userLogin,
        logout: () => {},
        user: data.user,
        isAuthenticated,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

function useAuth() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
}

export { useAuth };
export default UserContextProvider;
