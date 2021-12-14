import { createContext, useState } from 'react';
import { ILoginAuthenticationForm } from '../../models/authentication/form';
import { userSignIn } from '../../models/authentication/signin';
import { IEmployeeModel } from '../../models/user/employee';
import api from '../../services/api';

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

const UserContextProvider: React.FC<UserContextProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  async function userLogin(
    entry: ILoginAuthenticationForm,
    callback: VoidFunction
  ) {
    try {
      const response = api.post('/login', entry);
      console.log(response);
      const data: userSignIn = (await response).data;

      if (data) {
        setData({
          user: data.user,
          token: data.token,
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

export default UserContextProvider;
