import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'

import { Provider } from 'react-redux'

import { setupStore, RootState } from '../../../redux/store'
import { initialState as initAppState } from '../../../redux/appSlice'
import { initialState as initUserState } from '../../../redux/userSlice'
import { initialState as initObservedState  } from '../../../redux/observedSlice'

import ProfileCard from '../ProfileCard'

afterEach(() => {
    cleanup()
})

describe("ProfileCard test", () => {
    
    it("should show ENTRY", () => {
        const userState = {...initUserState, startPage: 'ENTRY'}

        const state:RootState = {
            userSlice: userState,
            appSlice: initAppState,
            observedSlice: initObservedState
        }

        const store = setupStore(state)

        render(<Provider store={store}><ProfileCard/></Provider>)

        const radio = screen.getAllByRole('radio')
        expect(radio.length).toBe(3)
      
        expect(radio[0].getAttribute('checked')).toBe('')
    })

    it("should save ENTRY", () => {
        const userState = {...initUserState, startPage: 'ENTRY'}

        const state:RootState = {
            userSlice: userState,
            appSlice: initAppState,
            observedSlice: initObservedState
        }

        const store = setupStore(state)

        render(<Provider store={store}><ProfileCard/></Provider>)

        // const button = screen.getByRole('button')
        // fireEvent.click(button)

        // screen.debug()
    })

})