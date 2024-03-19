import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import StartPageCard from '../StartPageCard'

const onNext = vi.fn()

afterEach(() => {
    cleanup()
})

describe("StartPageCard test", () => {
    
    it("should show default", () => {
        render(<StartPageCard startPage="ENTRY" onNext={onNext} />)

        const radio = screen.getAllByRole('radio')
        expect(radio.length).toBe(3)
      
        expect(radio[0].getAttribute('checked')).toBe('')
    })

    it("should show select next", () => {
        render(<StartPageCard startPage="ENTRY" onNext={onNext} />)

        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(onNext).toBeCalled()
    })
})