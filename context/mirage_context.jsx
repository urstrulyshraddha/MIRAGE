import React, { createContext, useReducer, useEffect, useState } from 'react';
import { mirageReducer, ACTION_TYPES } from './mirage_reducer';
import { storageService } from '../services/storage';

export const MirageContext = createContext(null);

export const MirageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mirageReducer, null, () => storageService.load());
  const [activeTab, setActiveTab] = useState('overview');
  const [searchOpen, setSearchOpen] = useState(false);

  // Synchronize any state mutation into persistent storage
  useEffect(() => {
    if (state) {
      storageService.save(state);
    }
  }, [state]);

  const addItem = (collection, item) => {
    dispatch({ type: ACTION_TYPES.ADD_ITEM, payload: { collection, item } });
  };

  const updateItem = (collection, id, updates) => {
    dispatch({ type: ACTION_TYPES.UPDATE_ITEM, payload: { collection, id, updates } });
  };

  const deleteItem = (collection, id) => {
    dispatch({ type: ACTION_TYPES.DELETE_ITEM, payload: { collection, id } });
  };

  const promoteIdea = (ideaId) => {
    dispatch({ type: ACTION_TYPES.PROMOTE_IDEA_TO_PROJECT, payload: { ideaId } });
  };

  const restoreState = (newState) => {
    dispatch({ type: ACTION_TYPES.RESTORE_STATE, payload: newState });
  };

  const wipeAll = () => {
    dispatch({ type: ACTION_TYPES.WIPE_STATE });
  };

  return (
    <MirageContext.Provider
      value={{
        state,
        activeTab,
        setActiveTab,
        searchOpen,
        setSearchOpen,
        addItem,
        updateItem,
        deleteItem,
        promoteIdea,
        restoreState,
        wipeAll
      }}
    >
      {children}
    </MirageContext.Provider>
  );
};
