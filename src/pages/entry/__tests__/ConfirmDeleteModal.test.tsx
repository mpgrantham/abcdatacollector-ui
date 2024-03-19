import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, fireEvent, render, screen } from '@testing-library/react'

import ConfirmDeleteModal from '../ConfirmDeleteModal'
import { Entry } from '../../../utils/entryUtils'


afterEach(() => {
    cleanup()
})

describe('ConfirmDeleteModal test', () => {

    it('should not render', () => {
        const entry: Entry = {} as Entry
       
        const onClose = vi.fn()
        const onConfirm = vi.fn()
     
        render(<ConfirmDeleteModal openFl={false} incident={entry} onClose={onClose} onConfirm={onConfirm} />)
     
        expect(screen.queryByText('Incident Filters')).toBeNull()
    })

    it('should call actions', () => {
        const entry: Entry = {} as Entry
       
        const onClose = vi.fn()
        const onConfirm = vi.fn()
     
        render(<ConfirmDeleteModal openFl={true} incident={entry} onClose={onClose} onConfirm={onConfirm} />)

        const buttons = screen.getAllByRole('button')
        
        fireEvent.click(buttons[0])
        expect(onClose).toBeCalled()

        fireEvent.click(buttons[1])
        expect(onConfirm).toBeCalled()
    })
})