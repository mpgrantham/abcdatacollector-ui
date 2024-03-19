import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import RequireLoginCard from '../RequireLoginCard'

const onNext = vi.fn()

afterEach(() => {
    cleanup()
})

describe("RequireLoginCard test", () => {
    
    it("should show yes", () => {
        render(<RequireLoginCard requireLogin="Y" onNext={onNext} />)

        const checkbox = screen.getByRole('checkbox')
       
        expect(checkbox.getAttribute('checked')).toBe('')
    })

    it("should show no", () => {
        render(<RequireLoginCard requireLogin="N" onNext={onNext} />)

        const checkbox = screen.getByRole('checkbox')
       
        expect(checkbox.getAttribute('checked')).toBeNull()
    })

    // it("should switch", () => {
    //     render(<RequireLoginCard requireLogin="N" onNext={onNext} />)

    //     let checkbox = screen.getByRole('checkbox')
    //     fireEvent.change(checkbox, {
    //         target: { checked: true },
    //     })
      
    //     checkbox = screen.getByRole('checkbox')

    //     expect(checkbox.getAttribute('checked')).toBeNull()
    // })

    it("should show select next", () => {
        render(<RequireLoginCard requireLogin="Y" onNext={onNext} />)

        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(onNext).toBeCalled()
    })
})