import { createContext, useState } from 'react';
import { ILoginAuthenticationForm } from '../../models/authentication/form';
import { IEmployeeModel } from '../../models/user/employee';
import { decode } from 'jsonwebtoken';
import api, { setAuthToken } from '../../services/api';

interface IAuthContext {
  user: IEmployeeModel | undefined;
  isAuthenticated: boolean;
  login(form: ILoginAuthenticationForm, callback: VoidFunction): Promise<void>;
  logout(): void;
  setUser(user: IEmployeeModel): void;
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
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@toAllocate:token');
    if (token) {
      setAuthToken(token);
      const user = decode(token) as IEmployeeModel;
      return { user, token };
    }
    return { user: undefined, token: '' };
  });

  const [isAuthenticated, setisAuthenticated] = useState(false);

  async function userLogin(
    entry: ILoginAuthenticationForm,
    callback: VoidFunction
  ) {
    try {
      const response = api.post('login', entry);
      const token: string = (await response).data.token;
      const user: IEmployeeModel = decode(token) as IEmployeeModel;
      if (user) {
        setData({
          user: { ...user, role: user.role },
          token: token,
        });
        localStorage.setItem('@toAllocate:token', token);
        setisAuthenticated(true);
        callback();
        return;
      }
      throw new Error('Usuário ou senha inválidos');
    } catch (e: any) {
      throw new Error(e);
    }
  }

  const logout = (): void => {
    setData({} as AuthState);
    setisAuthenticated(false);
    localStorage.removeItem('@toAllocate:token');
  };

  const setUser = (user: IEmployeeModel): void => {
    setData({
      ...data,
      user: user,
    });
  };

  return (
    <userContext.Provider
      value={{
        login: userLogin,
        logout,
        setUser,
        user: data.user,
        isAuthenticated,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
