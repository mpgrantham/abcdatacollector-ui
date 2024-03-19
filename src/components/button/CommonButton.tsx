import Button, { type ButtonProps } from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import Tooltip from '@mui/joy/Tooltip'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faDownload, faMinus, faPen, faFilter, faTrash }  from '@fortawesome/free-solid-svg-icons'

interface CommonButtonProps extends ButtonProps {
    label?: string;
    icon: 'download' | 'edit' | 'delete' | 'filter' | 'remove'
    color?: 'primary' | 'neutral'
    tooltip: string;
}

const icons = new Map([
    ['download', faDownload],
    ['edit', faPen],
    ['remove', faMinus],
    ['filter', faFilter],
    ['delete', faTrash],
]);

const CommonButton = ({ label, icon, tooltip, color = 'primary', ...rest }: CommonButtonProps) => {
    const svgIcon: IconDefinition = icons.get(icon) ?? faDownload

    const getButton = () => {
        if (label) {
            return (
                <Button 
                    variant="solid" 
                    color={color}
                    startDecorator={<FontAwesomeIcon icon={svgIcon} />}
                    {...rest}
                >
                    {label}
                </Button>
            )
        }

        return (
            <IconButton 
                variant="solid" 
                color={color}
                {...rest}
            >
                <FontAwesomeIcon icon={svgIcon} />
            </IconButton>
        )
    }
    return (
        <Tooltip title={tooltip} variant="plain">
             {getButton()}
        </Tooltip>
    )
}

export default CommonButton
