import { useContext } from 'react';
import {authContext} from '../contexts/authContext'; //contexto

export function useAuth() {
  const value = useContext(authContext)

  return value;
}