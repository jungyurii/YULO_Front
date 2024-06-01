// Vision UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Camera from "layouts/camera";
import Detected from "layouts/detected";
import Board from "layouts/board";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Vision UI Dashboard React icons
import { IoVideocam } from "react-icons/io5"; 
import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Camera Setting",
    key: "camera",
    route: "/camera",
    icon: <IoVideocam size="15px" color="inherit" />,
    component: Camera,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Detected List",
    key: "detected",
    route: "/detected",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Detected,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Video Check",
    key: "Video Check",
    route: "/profile",
    icon: <IoCheckmarkCircle size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Board",
    key: "Board",
    route: "/board",
    icon: <IoBuild size="15px" color="inherit" />,
    component: Board,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Configuration",
    key: "Configuration",
    route: "/profile",
    icon: <IoBuild size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },

  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: SignUp,
    noCollapse: true,
  },
];

export default routes;
