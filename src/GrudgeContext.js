import React, { useReducer, createContext, useCallback } from 'react';

import id from 'uuid/v4';
import initialState from './initialState';

/**
 * Action types for this particular reducer
 */
const GRUDGE_ADD = "GRUDGE_ADD";
const GRUDGE_FORGIVE = "GRUDGE_FORGIVE";

/**
 * Store the context instance in variable GrdugeContext
 */
export const GrudgeContext = createContext();

/**
 * Reducer is in charge of molding state based on action passed in
 * 
 */
const reducer = (state, action) => {
  if (action.type === GRUDGE_ADD) {
    return [action.payload, ...state];
  };
  if (action.type === GRUDGE_FORGIVE) {
    return state.map(grudge => {
      if (grudge.id !== action.payload.id) return grudge;
      return { ...grudge, forgiven: !grudge.forgiven }
    });
  };
  return state;
}


/**
 * Provider for our context
 */
export const GrudgeProvider = ({ children }) => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: GRUDGE_ADD,
        payload: {
          person,
          reason,
          forgiven: false,
          id: id()
        },
        meta: {},
        errors: []
      });
    }, [dispatch]);

  const toggleForgiveness = useCallback(id => {
    dispatch({
      type: GRUDGE_FORGIVE,
      payload: {
        id
      },
      meta: {},
      errors: []
    });
  }, [dispatch]);

  const value = { grudges, addGrudge, toggleForgiveness };


  return (
    <GrudgeContext.Provider value={value}>
      {children}
    </GrudgeContext.Provider>
  )
}
