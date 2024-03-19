import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import Typography from '@mui/joy/Typography'

import { Entry } from '../../utils/entryUtils'

import { formatDateTime } from '../../models/Incident'

interface ConfimModalProps {
    openFl: boolean;
    incident: Entry;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteModal = ({ openFl, incident, onClose, onConfirm}: ConfimModalProps) => {
    const handleConfirm = () => {
        onConfirm()
    }

    return (
        <Modal open={openFl} onClose={onClose}>
            <ModalDialog>
                <DialogTitle>Delete Incident</DialogTitle>
                <DialogContent>
                    <div className="flex-column gap-5">
                        <Typography>Click 'Confirm' to delete {formatDateTime(incident.incidentDate?.getTime())}. Otherwise, click 'Cancel'.</Typography>
                    </div>
                </DialogContent>
            
                <div className="flex-row-between width-full margin-t-50">
                    <Button type="button" color="neutral" onClick={onClose}>Cancel</Button>

                    <Button type="button" onClick={handleConfirm}>Confirm</Button>
                </div>
            </ModalDialog>
        </Modal>
    )
}

export default ConfirmDeleteModal
