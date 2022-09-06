import React from "react";
import {
    AiOutlineHome,
    AiOutlinePercentage,
    AiOutlineSetting,
    AiOutlineUsergroupAdd,
    AiOutlineCalendar,
  } from "react-icons/ai";

  import { MdLogout, MdOutlineListAlt,MdAttachMoney,MdOutlineInventory2, MdOutlineCategory} from "react-icons/md";
import { BiTask} from "react-icons/bi";

export const linksArray = [
    {
        label: "Calendario",
        icon: <AiOutlineCalendar />,
        to: "/",
        notification: 0,
        visibleOnlyFor: ""
    },
    {
        label: "Tareas",
        icon: <BiTask />,
        to: "/TodoList",
        notification: 0,
        visibleOnlyFor: "[god,subdirector]"
    }
    
];

export const secondaryLinksArray = [
    {
        label: "Ajustes",
        icon: <AiOutlineSetting />,
        to: "/ajustes",
        visibleOnlyFor: "[god]"
    }
];

export const settingsLinksArray = [
    {
        label: "Categorias",
        icon: <MdOutlineCategory />,
        to: "/ajustes/categorias",
    },
    {
        label: "Usuarios",
        icon: <AiOutlineUsergroupAdd />,
        to: "/ajustes/usuarios",
    },
];

