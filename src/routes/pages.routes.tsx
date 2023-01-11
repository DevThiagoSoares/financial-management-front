import PeopleIcon from '@mui/icons-material/People'
import EventIcon from '@mui/icons-material/Event'
import DevicesIcon from '@mui/icons-material/Devices'
import { Visitors } from '../pages/Visitors'
import { Schedule } from '../pages/Schedule'
import { Equipaments } from '../pages/Equipment'

export const APP_PAGES = [
  {
    title: 'Visitantes',
    route: '/visitors',
    icon: <PeopleIcon />,
    component: <Visitors />,
    showMenu: true,
  },
  {
    title: 'Agendamentos',
    route: '/schedule',
    icon: <EventIcon />,
    component: <Schedule />,
    showMenu: true,
  },
  {
    title: 'Equipamentos',
    route: '/equipaments',
    icon: <DevicesIcon />,
    component: <Equipaments />,
    showMenu: true,
  },
]
