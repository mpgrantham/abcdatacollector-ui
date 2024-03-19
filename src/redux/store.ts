import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import storageSession from 'redux-persist/lib/storage/session'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import appReducer from './appSlice'
import observedReducer from './observedSlice'
import userReducer from './userSlice'

const persistConfig = {
    key: 'abcDataCollectorRoot',
    version: 1,
    storage: storageSession,
}

const rootReducer = combineReducers({
    appSlice: appReducer,
    userSlice: userReducer,
    observedSlice: observedReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setupStore(preloadedState?: any) {
   
    const store = configureStore({
        reducer: persistedReducer,
        
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),

        preloadedState: preloadedState 
    })
      
    return store
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setupPersistor( store: any) {
    return persistStore(store)
}

export type RootState = ReturnType<typeof rootReducer>

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch