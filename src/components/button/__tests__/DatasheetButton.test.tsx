import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, fireEvent, render, screen} from '@testing-library/react'

import DatasheetButton from '../DatasheetButton'

afterEach(() => {
    cleanup()
})

const onClick = vi.fn()

describe("DatasheetButton test", () => {
    
    it("should show Export button with label", () => {
        render(<DatasheetButton onClick={onClick} />)
        
        fireEvent.click(screen.getByRole('button'))
        
        expect(onClick).toBeCalled()
    })

})