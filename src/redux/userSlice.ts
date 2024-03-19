import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/'

export const INITIAL = 'initial'

export interface AppMode {
    id: number;
    setupComplete: string;
    startPage: string;
    requireLogin: string;
    sessionToken: string;
    ipAddress: string;
    hostName: string;
    port: string;
}

export interface UserState {
    userId: number;
    appModeId: number;
    setupComplete: string;
    sessionToken: string;
    startPage: string;
    ipAddress: string;
    hostName: string;
    port: string;
}

export const initialState: UserState = {
    userId: 0,
    appModeId: 0,
    setupComplete: INITIAL,
    sessionToken: '',
    startPage: '',
    ipAddress: '',
    hostName: '',
    port: ''
}

export const getAppMode = createAsyncThunk(
    'userSlice/getAppMode',
    async(): Promise<AppMode> => {
        let appMode: AppMode = {
            id: 0,
            setupComplete: '',
            requireLogin: '',
            startPage: '',
            sessionToken: '',
            ipAddress: '',
            hostName: '',
            port: ''
        };
       
        const url =  `${API_URL}initial/appMode`

        await axios.get(url).then(response => {
            appMode = response.data
        })

        return appMode;
})

export const updateAppMode = createAsyncThunk(
    'userSlice/updateAppMode',
    async(appMode: AppMode): Promise<AppMode> => {
        const url =  `${API_URL}initial/appMode`

        await axios.put(url, appMode).then(response => {
            appMode = response.data
        })

        return appMode;
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setStartPage(state, action: PayloadAction<string>) {
            state.startPage = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAppMode.fulfilled, (state, action: PayloadAction<AppMode>) => {
            state.appModeId = action.payload.id
            state.setupComplete = action.payload.setupComplete
            state.startPage = action.payload.startPage ?? ''
            state.sessionToken = action.payload.sessionToken ?? ''
            state.ipAddress = action.payload.ipAddress ?? ''
            state.hostName = action.payload.hostName ?? ''
            state.port = action.payload.port ?? ''
        }),
        builder.addCase(updateAppMode.fulfilled, (state, action: PayloadAction<AppMode>) => {
            state.appModeId = action.payload.id
            state.setupComplete = action.payload.setupComplete
            state.startPage = action.payload.startPage ?? ''
            state.sessionToken = action.payload.sessionToken ?? ''
        })
    }
})

export const { setStartPage } = userSlice.actions;

export default userSlice.reducer;
