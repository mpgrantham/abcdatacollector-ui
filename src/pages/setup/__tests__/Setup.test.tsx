import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import axios from 'axios'

import { Provider } from 'react-redux'

import { setupStore, RootState } from '../../../redux/store'
import { initialState as initAppState } from '../../../redux/appSlice'
import { initialState as initUserState } from '../../../redux/userSlice'
import { initialState as initObservedState  } from '../../../redux/observedSlice'
import { observedOne } from '../../../utils/__tests__/mock-data.test'

import Setup from '../Setup'

vi.mock('axios')

afterEach(() => {
    cleanup()
})

beforeEach(() => {
    const mockData = { data: observedOne }
    axios.get = vi.fn().mockResolvedValue(mockData);
})

const state:RootState = {
    userSlice: initUserState,
    appSlice: initAppState,
    observedSlice: initObservedState
}

describe("Setup test", () => {
    
    it("should show first page", () => {
        const store = setupStore(state)

        render(<Provider store={store}><Setup /></Provider>)

        expect(screen.getByText('Start Page')).toBeDefined()
    })

    test("click first page next", () => {
        const store = setupStore(state)

        render(<Provider store={store}><Setup /></Provider>)
     
        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(screen.queryAllByText('Observed')).toBeDefined()
    })

    test("click second page back", () => {
        const store = setupStore(state)

        render(<Provider store={store}><Setup /></Provider>)
     
        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(screen.queryAllByText('Observed')).toBeDefined()

        const buttons = screen.getAllByRole('button')

        fireEvent.click(buttons[1])

        expect(screen.getByText('Start Page')).toBeDefined()
    })

    test("click second page next", () => {
        const store = setupStore(state)

        render(<Provider store={store}><Setup /></Provider>)
     
        const button = screen.getByRole('button')
        fireEvent.click(button)

        const input = screen.getByRole("textbox")
        fireEvent.change(input, {
            target: { value: 'Test Three' },
        })

        const buttons = screen.getAllByRole('button')
        // Add button
        fireEvent.click(buttons[0])

        // Click Next
        fireEvent.click(buttons[2])

        expect(screen.getByText('Confirmation')).toBeDefined()
    })

    test("click third page back", () => {
        const store = setupStore(state)

        render(<Provider store={store}><Setup /></Provider>)
     
        const button = screen.getByRole('button')
        fireEvent.click(button)

        const input = screen.getByRole("textbox")
        fireEvent.change(input, {
            target: { value: 'Test Three' },
        })

        let buttons = screen.getAllByRole('button')
        // Add button
        fireEvent.click(buttons[0])

        // Click Next
        fireEvent.click(buttons[2])

        expect(screen.getByText('Confirmation')).toBeDefined()

        buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])

        expect(screen.queryAllByText('Observed')).toBeDefined()
    })

    test("click third page next", () => {
        const store = setupStore(state)

        render(<Provider store={store}><Setup /></Provider>)
     
        const button = screen.getByRole('button')
        fireEvent.click(button)

        const input = screen.getByRole("textbox")
        fireEvent.change(input, {
            target: { value: 'Test Three' },
        })

        let buttons = screen.getAllByRole('button')
        // Add button
        fireEvent.click(buttons[0])

        // Click Next
        fireEvent.click(buttons[2])

        expect(screen.getByText('Confirmation')).toBeDefined()

        const mockData = { data: {
            id: 1,
            setupComplete: 'Y',
            requireLogin: 'N',
            startPage: 'DASHBOARD',
            sessionToken: 'TOKEN'
        } }

        axios.put = vi.fn().mockResolvedValue(mockData)

        buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[1])

        // expect(screen.queryAllByText('Observed')).toBeDefined()

    })
   
})