import { Link } from 'react-router-dom'
import Button from '@mui/joy/Button'
import Tooltip from '@mui/joy/Tooltip'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { ENTRY } from '../../utils/routes'

const AddButton = () => {
    return (
        <Tooltip title="Add Incident" variant="plain">
            <Button 
                component={Link} 
                to={ENTRY} 
                variant="solid" 
                color="success"
                startDecorator={<FontAwesomeIcon icon={faPlus} />}
            >
                Incident
            </Button>
        </Tooltip>
    )
}

export default AddButton