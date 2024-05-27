import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import DevicesIcon from "@mui/icons-material/Devices";
import { Visitors } from "../pages/app/Visitors/index.page";
import Schedule from "../pages/app/Schedule/index.page";

export const APP_PAGES = [
  {
    title: "Clientes Pendentes",
    route: "/app/NotPayment",
    icon: <PeopleIcon />,
    component: <Visitors />,
    showMenu: true,
  },
  {
    title: "Clientes Pagos",
    route: "/app/PaymentConfirmed",
    icon: <EventIcon />,
    component: <Schedule />,
    showMenu: true,
  },
];
