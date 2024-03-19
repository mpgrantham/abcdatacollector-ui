import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'

import { Provider } from 'react-redux'

import { setupStore, RootState } from '../../../redux/store'
import { initialState as initAppState } from '../../../redux/appSlice'
import { initialState as initUserState } from '../../../redux/userSlice'

import ObservedSelect from '../ObservedSelect'
import { Observed } from '../../../models/Observed'

afterEach(() => {
    cleanup()
})

const getRootState = () => {
    const o1: Observed = {
        id: 1,
        observedName: 'Test One',
        userId: 0
    }

    const o2: Observed = {
        id: 2,
        observedName: 'Test Two',
        userId: 0
    }

    const observedState = { observedId: 1, observed: o1, observedList: [o1, o2] }

    const state:RootState = {
        userSlice: initUserState,
        appSlice: initAppState,
        observedSlice: observedState
    }

    return state
}

describe("ObservedSelect test", () => {

    it("should show closed", () => {
        const store = setupStore(getRootState())

        render(<Provider store={store}><ObservedSelect /></Provider>)
       
        const button = screen.getByRole('combobox')

        expect(button.innerHTML).toBe('Test One')

       fireEvent.click
    })

    it("should open", () => {
        const store = setupStore(getRootState())

        render(<Provider store={store}><ObservedSelect /></Provider>)
       
        const button = screen.getByRole('combobox')

        expect(button.innerHTML).toBe('Test One')

        let options = screen.queryAllByRole('option')
        expect(options.length).toBe(0)

        fireEvent.click(button)

        options = screen.getAllByRole('option')
        expect(options.length).toBe(2)
    })

    it("should change selected", () => {
        const store = setupStore(getRootState())

        render(<Provider store={store}><ObservedSelect /></Provider>)
       
        let button = screen.getByRole('combobox')

        expect(button.innerHTML).toBe('Test One')
      
        fireEvent.click(button)

        const options = screen.getAllByRole('option')
       
        fireEvent.click(options[1])
        button = screen.getByRole('combobox')
        expect(button.innerHTML).toBe('Test Two')
        
    })
})