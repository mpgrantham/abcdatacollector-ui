import React from 'react'
import { afterEach, describe, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { setupStore, RootState } from '../../../redux/store'
import { initialState as initAppState } from '../../../redux/appSlice'
import { initialState as initUserState } from '../../../redux/userSlice'
import { initialState as initObservedState  } from '../../../redux/observedSlice'

import DashboardContent from '../DashboardContent'

afterEach(() => {
    cleanup()
})

describe("DashboardContent test", () => {
    
    it("should show default", () => {
        vi.spyOn(React, 'useEffect').mockImplementation((f) => f())
        
        const state:RootState = {
            userSlice: initUserState,
            appSlice: initAppState,
            observedSlice: initObservedState
        }

        const store = setupStore(state)

        render(<BrowserRouter><Provider store={store}><DashboardContent /></Provider></BrowserRouter>)

        // const buttons = screen.getAllByRole('button')

        screen.debug()
       
        // const item = screen.getByRole('listitem')

        // expect(item.innerHTML).toContain('Dashboard')
    })

})