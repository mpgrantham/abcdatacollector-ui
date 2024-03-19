import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { setupStore, RootState } from '../../../redux/store'
import { initialState as initAppState } from '../../../redux/appSlice'
import { initialState as initUserState } from '../../../redux/userSlice'
import { initialState as initObservedState  } from '../../../redux/observedSlice'

import PageBreadcrumbs from '../PageBreadcrumbs'

afterEach(() => {
    cleanup()
})

describe("PageBreadcrumbs test", () => {
    
    it("should show default Dashboard", () => {
        const appState = {...initAppState, breadcrumbs: ['Dashboard']}

        const state:RootState = {
            userSlice: initUserState,
            appSlice: appState,
            observedSlice: initObservedState
        }

        const store = setupStore(state)

        render(<BrowserRouter><Provider store={store}><PageBreadcrumbs/></Provider></BrowserRouter>)
       
        const item = screen.getByRole('listitem')

        expect(item.innerHTML).toContain('Dashboard')
    })

    it("should show default Dashboard and Link", () => {
        const appState = {...initAppState, breadcrumbs: ['Dashboard', 'Incident Log']}

        const state:RootState = {
            userSlice: initUserState,
            appSlice: appState,
            observedSlice: initObservedState
        }

        const store = setupStore(state)

        render(<BrowserRouter><Provider store={store}><PageBreadcrumbs/></Provider></BrowserRouter>)

        const link = screen.getByRole('link')

        expect(link.innerHTML).toBe('Dashboard')
    })
})