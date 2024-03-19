import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, render, screen } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import axios from 'axios'

import { setupStore, RootState } from '../../../redux/store'
import { initialState as initAppState } from '../../../redux/appSlice'
import { initialState as initUserState } from '../../../redux/userSlice'
import { initialState as initObservedState  } from '../../../redux/observedSlice'

import IncidentEntry from '../IncidentEntry'

afterEach(() => {
    cleanup()
})

describe("IncidentEntry test", () => {
    
    it("should show IncidentEntry", () => {
        const state:RootState = {
            userSlice: initUserState,
            appSlice: initAppState,
            observedSlice: initObservedState
        }

        const store = setupStore(state)

        const mockData = { data: ['Mild', 'Moderate'] }

        axios.get = vi.fn().mockResolvedValue(mockData);

        render(<BrowserRouter><Provider store={store}><IncidentEntry /></Provider></BrowserRouter>)

        const items = screen.getAllByRole('listitem')
        expect(items[1].innerHTML).toContain('Incident Entry')
    })
})