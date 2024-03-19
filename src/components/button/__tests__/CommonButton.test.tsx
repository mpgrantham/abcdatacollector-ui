import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, fireEvent, render, screen} from '@testing-library/react'

import CommonButton from '../CommonButton'

afterEach(() => {
    cleanup()
})

const onClick = vi.fn()

describe("CommonButton test", () => {
    
    it("should show Export button with label", () => {
        render(<CommonButton label="Export" icon="download" onClick={onClick} tooltip="Download" />)
        
        expect(screen.getByText('Export')).toBeDefined()
    })

    it("should show Export button without label", () => {
        render(<CommonButton icon="download" onClick={onClick} tooltip="Download" />)
       
        const label = screen.queryByText('Export')
        expect(label).toBeNull()
    })

    it("should call onClick", () => {
        render(<CommonButton label="Export" icon="download" onClick={onClick} tooltip="Download" />)

        fireEvent.click(screen.getByRole('button'))
        
        expect(onClick).toBeCalled()
    })
})