import React, { useReducer, useMemo, FC, Dispatch, useContext } from 'react';
import { reducer, IInitialState, IActionPayload, initialState } from 'store';

const Context = React.createContext<{ reducerState: IInitialState; dispatch: Dispatch<IActionPayload>; }>({
    reducerState: initialState,
    dispatch: () => {},
});

interface ITrackListProvider{
    initialState: IInitialState;
}

const TrackListProvider:FC<ITrackListProvider> = ({children, initialState: currentState})=>{
    const [reducerState, dispatch] = useReducer(reducer, currentState);
    const value = useMemo(
      () => ({
        reducerState,
        dispatch,
      }),
      [reducerState]
    );
   
return <Context.Provider value={value}>{children}</Context.Provider>
}

const useTrackList = () => useContext(Context);

export {useTrackList, TrackListProvider};