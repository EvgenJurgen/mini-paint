import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { State } from '../reducers/rootReducer';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
