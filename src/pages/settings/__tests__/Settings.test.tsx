import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, render, screen } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import axios from 'axios'

import { setupStore, RootState } from '../../../redux/store'
import { initialState as initAppState } from '../../../redux/appSlice'
import { initialState as initUserState } from '../../../redux/userSlice'
import { initialState as initObservedState  } from '../../../redux/observedSlice'

import { observedOne } from '../../../utils/__tests__/mock-data.test'

import Settings from '../Settings'

afterEach(() => {
    cleanup()
})

vi.mock('axios')

describe('Settings test', () => {

    it('should render page', () => {

        axios.get = vi.fn().mockResolvedValue({ data: observedOne })
        
        const state:RootState = {
            userSlice: initUserState,
            appSlice: initAppState,
            observedSlice: initObservedState
        }

        const store = setupStore(state)

        render(<BrowserRouter><Provider store={store}><Settings /></Provider></BrowserRouter>)

        const items = screen.getAllByRole('listitem')
        expect(items[1].innerHTML).toContain('Settings')
     })

})