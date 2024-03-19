import IconButton from '@mui/joy/IconButton'
import Tooltip from '@mui/joy/Tooltip'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf}  from '@fortawesome/free-solid-svg-icons'

interface DatasheetButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DatasheetButton = ( { onClick }: DatasheetButtonProps) => {
    return (
        <Tooltip title="Export Data Sheet" variant="plain">
            <IconButton 
                variant="solid" 
                color="primary"
                onClick={onClick}
            >
                <FontAwesomeIcon icon={faFilePdf} />
            </IconButton>
        </Tooltip>
    )
}

export default DatasheetButton
