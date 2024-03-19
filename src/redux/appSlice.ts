import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
    breadcrumbs: string[];
    loadingFl: boolean;
    snackbarFl: boolean;
    snackbarSeverity: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
    snackbarMessage: string;
}

export const initialState: AppState = {
    breadcrumbs: ['Dashboard'],
    loadingFl: false,
    snackbarFl: false,
    snackbarSeverity: 'neutral',
    snackbarMessage: ''
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setBreadcrumbs(state, action: PayloadAction<string[]>) {
            state.breadcrumbs = action.payload
        },
        setBreadcrumb(state, action: PayloadAction<string>) {
            const breadcrumb = action.payload
            const idx = state.breadcrumbs.findIndex(b => b === breadcrumb)
            if (idx === -1) {
                state.breadcrumbs.push(breadcrumb)
            } else {
                const length = state.breadcrumbs.length
                const startIdx = idx + 1
                if (startIdx < length) {
                    state.breadcrumbs.splice(startIdx, length - startIdx)
                }
            }
        },  
        setLoading(state, action: PayloadAction<boolean>) {
            state.loadingFl = action.payload
        },
        setSnackbar(state, action: PayloadAction<{ severity: 'primary' | 'neutral' | 'danger' | 'success' | 'warning', message: string }>) {
            state.snackbarFl = true
            state.snackbarSeverity = action.payload.severity
            state.snackbarMessage = action.payload.message
        },
        clearSnackbar(state) {
            state.snackbarFl = false
            state.snackbarSeverity = 'neutral'
            state.snackbarMessage = ''
        },
    }
})

export const { setBreadcrumbs, setBreadcrumb, setLoading, setSnackbar, clearSnackbar } = appSlice.actions;

export default appSlice.reducer;