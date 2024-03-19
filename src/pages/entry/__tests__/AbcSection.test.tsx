import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, render, screen, fireEvent} from '@testing-library/react'

import AbcSection from '../AbcSection'

const onAdd = vi.fn()
const onChange = vi.fn()

afterEach(() => {
    cleanup()
})

const values = [{id: 1, typeCode: 'A', value: 'Test One', activeFl: 'Y'}, {id: 2, typeCode: 'A', value: 'Test Two', activeFl: 'Y'}]

describe("AbcSection test", () => {
    
    it("should show ABCs not selected", () => {
        render(<AbcSection label="Antecdent" name="Antecdent" values={values} selected={[]} onChange={onChange} onAdd={onAdd} />)

        expect(screen.getByText("Antecdent")).toBeDefined()

        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes.length).toBe(2)

        expect(checkboxes[0].getAttribute('value')).toBe('1')
    })

    it("should show ABCs selected", () => {
        render(<AbcSection label="Antecdent" name="Antecdent" values={values} selected={[1]} onChange={onChange} onAdd={onAdd} />)

        const checkboxes = screen.getAllByRole('checkbox')
        
        expect(checkboxes[0].getAttribute('checked')).toBe('')
    })

    it("should call onChange", () => {
        render(<AbcSection label="Antecdent" name="Antecdent" values={values} selected={[]} onChange={onChange} onAdd={onAdd} />)
       
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes.length).toBe(2)

        fireEvent.change(checkboxes[0], {
            target: { value: '1' },
          })

        // expect(onChange).toBeCalled()
    })

    
})