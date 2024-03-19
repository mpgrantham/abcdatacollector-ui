import {afterEach, describe, expect, it} from 'vitest'
import {cleanup, fireEvent, render, screen} from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { setupStore, RootState } from '../../../redux/store'
import { initialState as initAppState } from '../../../redux/appSlice'
import { initialState as initUserState } from '../../../redux/userSlice'
import { initialState as initObservedState  } from '../../../redux/observedSlice'

import SettingsButton from '../SettingsButton'

afterEach(() => {
    cleanup()
})

describe("SettingsButton test", () => {
    
    it("should show closed", () => {
        const appState = {...initAppState, breadcrumbs: ['Dashboard']}

        const state:RootState = {
            userSlice: initUserState,
            appSlice: appState,
            observedSlice: initObservedState
        }

        const store = setupStore(state)

        render(<BrowserRouter><Provider store={store}><SettingsButton /></Provider></BrowserRouter>)
      
        const items = screen.queryAllByRole('menuitem')

        expect(items.length).toBe(0)
    })

    it("should open", () => {
        const appState = {...initAppState, breadcrumbs: ['Dashboard']}

        const state:RootState = {
            userSlice: initUserState,
            appSlice: appState,
            observedSlice: initObservedState
        }

        const store = setupStore(state)

        render(<BrowserRouter><Provider store={store}><SettingsButton /></Provider></BrowserRouter>)

        const button = screen.getByRole('button')
       
        fireEvent.click(button)

        const items = screen.getAllByRole('menuitem')

        expect(items.length).toBe(4)

        expect(items[0].innerHTML).toContain('Settings')
        expect(items[1].innerHTML).toContain('Data Sheet')
        expect(items[2].innerHTML).toContain('Help')
        expect(items[3].innerHTML).toContain('Resources')
    })

})