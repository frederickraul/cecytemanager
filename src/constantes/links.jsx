import React from "react";
import {
    AiOutlineHome,
    AiOutlinePercentage,
    AiOutlineSetting,
    AiOutlineUsergroupAdd,
    AiOutlineCalendar,
  } from "react-icons/ai";

  import { MdLogout, MdOutlineListAlt,MdAttachMoney,MdOutlineInventory2, MdOutlineCategory} from "react-icons/md";
import { BsPeople } from "react-icons/bs";

export const linksArray = [
    {
        label: "Calendario",
        icon: <AiOutlineCalendar />,
        to: "/",
        notification: 0,
    }
    
];

export const secondaryLinksArray = [
    {
        label: "Ajustes",
        icon: <AiOutlineSetting />,
        to: "/ajustes",
        visibleOnlyFor: "god"
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

