import {afterEach, describe, it, vi} from 'vitest'
import {cleanup, render, screen, fireEvent } from '@testing-library/react'

import Duration from '../Duration'

afterEach(() => {
    cleanup()
})

const onChange = vi.fn()

describe("Duration test", () => {
    
    it("should show Duration", () => {
        render(<Duration value="01:20" onChange={onChange} readOnly={false} />)
     
        const input = screen.getByRole("textbox")
        fireEvent.change(input, {
            target: { value: '02:30' },
        })

        expect(onChange).toHaveBeenCalled()
    })
})