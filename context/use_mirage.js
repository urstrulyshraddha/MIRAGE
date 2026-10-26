import { useContext } from 'react';
import { MirageContext } from './mirage_context';

export const useMirage = () => {
  const context = useContext(MirageContext);
  if (!context) {
    throw new Error('useMirage must be consumed within a MirageProvider');
  }
  return context;
};
