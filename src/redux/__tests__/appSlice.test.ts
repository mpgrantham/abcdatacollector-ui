import { describe, test, expect } from 'vitest'

import reducer, { initialState, setBreadcrumb, setBreadcrumbs, setLoading, setSnackbar, clearSnackbar} from '../appSlice'

describe('appSlice test', () => {

    test('setBreadcrumbs', () => {
        const previousState = initialState
        const breadcrumbs = ['Dashboard', 'Entry'];
        const updatedState = reducer(previousState, setBreadcrumbs(breadcrumbs))
        expect(updatedState.breadcrumbs).toEqual(breadcrumbs)
    })

    test('setBreadcrumb push', () => {
        const previousState = initialState
        const updatedState = reducer(previousState, setBreadcrumb('Entry'))
        expect(updatedState.breadcrumbs).toEqual(['Dashboard', 'Entry'])
    })

    test('setBreadcrumb truncate', () => {
        const previousState = { ...initialState, breadcrumbs: ['Dashboard', 'Entry'] }
        const updatedState = reducer(previousState, setBreadcrumb('Dashboard'))
        expect(updatedState.breadcrumbs).toEqual(['Dashboard'])
    })

    test('setLoading', () => {
        const previousState = initialState
        const updatedState = reducer(previousState, setLoading(true))
        expect(updatedState.loadingFl).toEqual(true)
    })

    test('setSnackbar', () => {
        const previousState = initialState
        const updatedState = reducer(previousState, setSnackbar({severity: 'danger', message: 'Test' }))
        expect(updatedState.snackbarFl).toEqual(true)
        expect(updatedState.snackbarSeverity).toEqual('danger')
        expect(updatedState.snackbarMessage).toEqual('Test')
    })

    test('clearSnackbar', () => {
        const previousState = initialState
        let updatedState = reducer(previousState, setSnackbar({severity: 'danger', message: 'Test' }))
        expect(updatedState.snackbarFl).toEqual(true)
        expect(updatedState.snackbarSeverity).toEqual('danger')
        expect(updatedState.snackbarMessage).toEqual('Test')

        updatedState = reducer(previousState, clearSnackbar())
        expect(updatedState.snackbarFl).toEqual(false)
        expect(updatedState.snackbarSeverity).toEqual('neutral')
        expect(updatedState.snackbarMessage).toEqual('')
    })
  
})