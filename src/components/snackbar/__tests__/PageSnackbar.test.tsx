import {afterEach, describe, expect, it} from 'vitest'
import {cleanup, render, screen} from '@testing-library/react'

import { Provider } from 'react-redux'

import { setupStore } from '../../../redux/store'

import PageSnackbar from '../PageSnackbar'

afterEach(() => {
    cleanup()
})

describe("PageSnackbar test", () => {
    
    it("should show Snackbar", () => {
        const store = setupStore()
        
        render(<Provider store={store}><PageSnackbar openFlag={true} severity="danger" message="Test Message" /></Provider>)

        expect(screen.getByText('Test Message')).toBeDefined()
    })
})