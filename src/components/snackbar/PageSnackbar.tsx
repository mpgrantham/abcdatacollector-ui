import Snackbar from '@mui/joy/Snackbar';

import { useAppDispatch  } from '../../redux/store'

import { clearSnackbar } from '../../redux/appSlice';

interface PageSnackbarProps {
    openFlag: boolean;
    severity: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
    message: string;
}

const PageSnackbar = ({ openFlag, severity, message }: PageSnackbarProps) => {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(clearSnackbar())
    }

    return (
        <Snackbar
            autoHideDuration={3000}
            open={openFlag}
            variant="soft"
            color={severity}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            {message}
        </Snackbar>
    )
}

export default PageSnackbar
