import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import DevicesIcon from "@mui/icons-material/Devices";
import { Visitors } from "../pages/app/Visitors";
import Schedule from "../pages/app/Schedule";
import Equipaments from "../pages/app/Equipment";

export const APP_PAGES = [
  {
    title: "Visitantes",
    route: "/app/Equipment",
    icon: <PeopleIcon />,
    component: <Visitors />,
    showMenu: true,
  },
  {
    title: "Agendamentos",
    route: "/app/Schedule",
    icon: <EventIcon />,
    component: <Schedule />,
    showMenu: true,
  },
  {
    title: "Equipamentos",
    route: "/app/Equipment",
    icon: <DevicesIcon />,
    component: <Equipaments />,
    showMenu: true,
  },
];
