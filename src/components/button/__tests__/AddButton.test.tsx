import {afterEach, describe, expect, it} from 'vitest'
import {cleanup, render, screen} from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'

import AddButton from '../AddButton'


afterEach(() => {
    cleanup()
})

describe("AddButton test", () => {
    
    it("should show default add button", () => {
        render(<BrowserRouter><AddButton /></BrowserRouter>)

        const link = screen.getByRole('link')
        expect(link.innerHTML).toContain('Incident')
    })
 
})