import { afterEach, describe, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'

import axios from 'axios'

import { Provider } from 'react-redux'

import { setupStore, RootState } from '../../../redux/store'
import { initialState as initAppState } from '../../../redux/appSlice'
import { initialState as initUserState } from '../../../redux/userSlice'

import ObservedCard from '../ObservedCard'

import { observedOne, observedTwo } from '../../../utils/__tests__/mock-data.test'
import { incidentOne, incidentTwo } from '../../../utils/__tests__/mock-data.test'

afterEach(() => {
    cleanup()
})

vi.mock('../../../utils/export', () => ({ 
    exportObservedData: vi.fn()
}))

vi.mock('axios')

describe("ObservedCard test", () => {
    
    it("should show with one observed", () => {
       
        const currentState: RootState = {
            userSlice: initUserState,
            appSlice: initAppState,
            observedSlice: { observedId: 2, observed: observedTwo, observedList: [observedTwo]}
        }
        
        axios.get = vi.fn().mockResolvedValue({ data: observedOne })

        const store = setupStore(currentState)

        render(<Provider store={store}><ObservedCard /></Provider>)
        
        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(4)

        expect(screen.getByText('Observed Two')).toBeDefined()
    })

    it("should show add", async () => {
        const currentState: RootState = {
            userSlice: initUserState,
            appSlice: initAppState,
            observedSlice: { observedId: 2, observed: observedTwo, observedList: [observedTwo]}
        }
        
        axios.get = vi.fn().mockResolvedValue({ data: observedOne })

        const store = setupStore(currentState)

        await act( async () => {
            render(<Provider store={store}><ObservedCard /></Provider>)
        })

        const buttons = screen.getAllByRole('button')
                     
        fireEvent.click(buttons[0])

        const tabs = screen.getAllByRole('tab')

        expect(tabs.length).toBe(4)
        expect(tabs[3].innerHTML).toBe('Locations')
    })

    it("should show edit", async () => {
        const currentState: RootState = {
            userSlice: initUserState,
            appSlice: initAppState,
            observedSlice: { observedId: 2, observed: observedTwo, observedList: [observedTwo]}
        }
        
        axios.get = vi.fn().mockResolvedValue({ data: observedOne })

        const store = setupStore(currentState)

        await act( async () => {
            render(<Provider store={store}><ObservedCard /></Provider>)
        })

        const buttons = screen.getAllByRole('button')
                     
        fireEvent.click(buttons[1])

        const input = screen.getByDisplayValue('Observed Two')
        
        expect(input).toBeDefined()
    })

    it("should show delete", async () => {
        const currentState: RootState = {
            userSlice: initUserState,
            appSlice: initAppState,
            observedSlice: { observedId: 2, observed: observedTwo, observedList: [observedTwo, observedOne]}
        }
        
        axios.get = vi.fn().mockResolvedValue({ data: observedOne })

        const store = setupStore(currentState)

        await act( async () => {
            render(<Provider store={store}><ObservedCard /></Provider>)
        })

        const buttons = screen.getAllByLabelText('Delete Observed')
        expect(buttons.length).toBe(2)
                     
        fireEvent.click(buttons[0])

        const text = screen.getByText('This permanently removes the observed and all associated data.')
        
        expect(text).toBeDefined()
    })

    it("should export", () => {
        const currentState: RootState = {
            userSlice: initUserState,
            appSlice: initAppState,
            observedSlice: { observedId: 2, observed: observedTwo, observedList: [observedTwo]}
        }
        
        axios.get = vi.fn().mockResolvedValue({ data: observedOne })

        const store = setupStore(currentState)

        render(<Provider store={store}><ObservedCard /></Provider>)

        const buttons = screen.getAllByRole('button')
        
        const mockIncidents = { data: [incidentOne, incidentTwo] }

        axios.get = vi.fn().mockResolvedValue(mockIncidents);
        
        fireEvent.click(buttons[2])
    })

})