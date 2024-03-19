import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, fireEvent, render, screen } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import axios from 'axios'

import { setupStore, RootState } from '../../../redux/store'
import { initialState as initAppState } from '../../../redux/appSlice'
import { initialState as initUserState } from '../../../redux/userSlice'
import { initialState as initObservedState  } from '../../../redux/observedSlice'

import IncidentLog from '../IncidentLog'

import { incidentOne, incidentTwo } from '../../../utils/__tests__/mock-data.test'

afterEach(() => {
    cleanup()
})

vi.mock('axios')

describe('IncidentLog test', () => {

    it('should render page', () => {

        const mockData = { data: [incidentOne, incidentTwo] }

        axios.get = vi.fn().mockResolvedValue(mockData);
               
        const state:RootState = {
            userSlice: initUserState,
            appSlice: initAppState,
            observedSlice: initObservedState
        }

        const store = setupStore(state)

        render(<BrowserRouter><Provider store={store}><IncidentLog /></Provider></BrowserRouter>)

        const items = screen.getAllByRole('listitem')
        expect(items[1].innerHTML).toContain('Incident Log')
    })

    it('should render filter', () => {

        const mockData = { data: [incidentOne, incidentTwo] }

        axios.get = vi.fn().mockResolvedValue(mockData);
               
        const state:RootState = {
            userSlice: initUserState,
            appSlice: initAppState,
            observedSlice: initObservedState
        }

        const store = setupStore(state)

        render(<BrowserRouter><Provider store={store}><IncidentLog /></Provider></BrowserRouter>)

        const buttons = screen.getAllByRole('button')
        
        fireEvent.click(buttons[0])

        expect(screen.queryByText('Incident Filters')).toBeDefined()

    })

    //  it('should render export', () => {

    //     const mockData = { data: [incidentOne, incidentTwo] }

    //     axios.get = vi.fn().mockResolvedValue(mockData);
               
    //     const state:RootState = {
    //         userSlice: initUserState,
    //         appSlice: initAppState,
    //         observedSlice: initObservedState
    //     }

    //     const store = setupStore(state)

    //     render(<BrowserRouter><Provider store={store}><IncidentLog /></Provider></BrowserRouter>)

    //     const buttons = screen.getAllByRole('button')

    //     fireEvent.click(buttons[0])

    //     screen.debug()
    //  })

})