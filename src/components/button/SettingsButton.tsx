import { pdf } from '@react-pdf/renderer'

import { Link as RouterLink } from 'react-router-dom'
import IconButton from '@mui/joy/IconButton'
import MenuButton from '@mui/joy/MenuButton'
import Dropdown from '@mui/joy/Dropdown'
import Menu from '@mui/joy/Menu'
import MenuItem from '@mui/joy/MenuItem'
import Link from '@mui/joy/Link'
import ListDivider from '@mui/joy/ListDivider'
import ListItemDecorator from '@mui/joy/ListItemDecorator'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faEllipsisVertical, faFilePdf, faQuestion } from '@fortawesome/free-solid-svg-icons'

import Datasheet from '../datasheet/Datasheet'
import { download } from '../../utils/export'

import { useAppSelector } from '../../redux/store'

import { SETTINGS } from '../../utils/routes'

const SettingsButton = () => {
    const { observed } = useAppSelector((state) => state.observedSlice)

    const createDataSheet = async () => {
        const blob = await pdf(<Datasheet observed={observed} />).toBlob()
        download(blob, `Datasheet_${observed.observedName}.pdf`)
    }

    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
            >
                <FontAwesomeIcon icon={faEllipsisVertical} size="lg"/>
            </MenuButton>
            <Menu placement="bottom-end">
                <MenuItem component={RouterLink} to={SETTINGS}>
                    <ListItemDecorator>
                        <FontAwesomeIcon icon={faGear} />
                    </ListItemDecorator>{' '}
                    Settings
                </MenuItem>
                <MenuItem onClick={createDataSheet}>
                    <ListItemDecorator>
                        <FontAwesomeIcon icon={faFilePdf} />
                    </ListItemDecorator>{' '}
                    Data Sheet
                </MenuItem>
                <ListDivider />
                <MenuItem>
                    <ListItemDecorator>
                        <FontAwesomeIcon icon={faQuestion} />
                    </ListItemDecorator>{' '}
                    <Link 
                        href="/ABC-Data-Collector.pdf" 
                        target="_blank" 
                        rel="noreferrer" 
                        underline="none"
                        sx={{ color: 'rgb(50, 56, 62)' }}
                    >
                        Help
                    </Link>
                </MenuItem>
            </Menu>
        </Dropdown>
    )
}

export default SettingsButton
