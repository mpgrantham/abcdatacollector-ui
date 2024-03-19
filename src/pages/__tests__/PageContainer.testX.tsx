import { afterEach, describe, expect, it,  vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'

import axios from 'axios'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { setupStore, RootState } from '../../redux/store'
import { initialState as initAppState } from '../../redux/appSlice'
import { initialState as initUserState } from '../../redux/userSlice'
import { initialState as initObservedState  } from '../../redux/observedSlice'

import PageContainer from '../PageContainer'

vi.mock('axios')

afterEach(() => {
    cleanup()
})

const state:RootState = {
    userSlice: initUserState,
    appSlice: initAppState,
    observedSlice: initObservedState
}

describe("PageContainer test", () => {
    
    it("should show initial loading", () => {
        const mockData = { data: {
            id: 1,
            setupComplete: 'N',
            requireLogin: 'N',
            startPage: 'DASHBOARD',
            sessionToken: 'TOKEN'
        } }
        
        axios.get = vi.fn().mockResolvedValue(mockData)

        const store = setupStore(state)


        render(<BrowserRouter><Provider store={store}><PageContainer /></Provider></BrowserRouter>)

        expect(screen.getByText('Initial Loading...')).toBeDefined()
    })
    
    /*
    it("should show Setup", () => {
        const currentState:RootState = {
            userSlice: { ... initUserState, setupComplete: 'N' },
            appSlice: initAppState,
            observedSlice: initObservedState
        }

        const store = setupStore(currentState)

        const mockData = { data: {
            id: 1,
            setupComplete: 'N',
            requireLogin: 'N',
            startPage: 'DASHBOARD',
            sessionToken: 'TOKEN'
        } }

        axios.get = vi.fn().mockResolvedValue(mockData)
        
        render(<BrowserRouter><Provider store={store}><PageContainer /></Provider></BrowserRouter>)

        expect(screen.getByText('Start Page')).toBeDefined()
    })
    */

    /*
    it("should show content", () => {
        const currentState:RootState = {
            userSlice: { ... initUserState, setupComplete: 'Y' },
            appSlice: initAppState,
            observedSlice: initObservedState
        }

        const store = setupStore(currentState)

        const mockData = { data: {
            id: 1,
            setupComplete: 'Y',
            requireLogin: 'N',
            startPage: 'DASHBOARD',
            sessionToken: 'TOKEN'
        } }
         
        axios.get = vi.fn().mockResolvedValue(mockData)
       
        // axios.get = vi.fn()
        //     .mockResolvedValue('default')
        //     .mockResolvedValueOnce(mockData)
        //     .mockResolvedValueOnce(mockList)
          

        render(<BrowserRouter><Provider store={store}><PageContainer /></Provider></BrowserRouter>)

        // screen.debug()


        expect(screen.getByText('Dashboard')).toBeDefined()
    })
    */

})