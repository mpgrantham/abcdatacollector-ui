import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import Link from '@mui/joy/Link'

import { Observed } from '../../models/Observed'
import Typography from '@mui/joy/Typography'

interface ConfimModalProps {
    openFl: boolean;
    observed: Observed;
    onClose: () => void;
    onDelete: () => void;
    onExport: (observedId: number) => void;
}

const ConfirmDeleteModal = ({ openFl, observed, onClose, onDelete, onExport}: ConfimModalProps) => {
    const handleConfirm = () => {
        onDelete()
    }

    return (
        <Modal open={openFl} onClose={onClose}>
            <ModalDialog>
                <DialogTitle>Remove Observed</DialogTitle>
                <DialogContent>
                    <div className="flex-column gap-5">
                    <Typography>Click 'Confirm' to delete {observed.observedName}. Otherwise, click 'Cancel'.</Typography>

                    <div className="margin-t-100"><Typography level="title-md">Please Note</Typography></div>
                    
                    <Typography>This permanently removes the observed and all associated data.</Typography>
                    <Typography>
                        If you might need to restore the data for {observed.observedName} you need to perform a backup before deleting.
                    </Typography>
                    <Typography>
                        <Link component="button" onClick={() => onExport(observed.id)}><b>Click here to backup</b></Link>
                    </Typography>

                    </div>
               
                </DialogContent>
            
                <div className="flex-row-between width-full margin-t-50">
                    <Button type="button" variant="solid" color="neutral" onClick={onClose}>Cancel</Button>

                    <Button type="button" onClick={handleConfirm}>Confirm</Button>
                </div>
            </ModalDialog>
        </Modal>
    )
}

export default ConfirmDeleteModal
