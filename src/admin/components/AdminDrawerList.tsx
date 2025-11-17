import React from "react";
import DrawerList from "../../component/DrawerList";
import { AccountBox, Add, Category, Dashboard, ElectricBolt, Home, IntegrationInstructions, LocalOffer, Logout } from "@mui/icons-material";

const menu=[
    {
        name:"Dashboard",
        path:"/admin",
        icon: <Dashboard className="text-[#00927c]"/>,
        activeIcon: <Dashboard className="text-white"/>,
    },
    {
        name:"Coupon",
        path:"/admin/coupon",
        icon: <IntegrationInstructions className="text-[#00927c]"/>,
        activeIcon: <IntegrationInstructions className="text-white"/>,
    },
    {
        name:"Add New Coupon",
        path:"/admin/add-coupon",
        icon: <Add className="text-[#00927c]"/>,
        activeIcon: <Add className="text-white"/>,
    },
    {
        name:"Home page",
        path:"/admin/home-grid",
        icon: <Home className="text-[#00927c]"/>,
        activeIcon: <Home className="text-white"/>,
    },
    {
        name:"Electronics Category",
        path:"/admin/electronics-category",
        icon: <ElectricBolt className="text-[#00927c]"/>,
        activeIcon: <ElectricBolt className="text-white"/>,
    },
    {
        name:"Shop By Category",
        path:"/admin/shop-by-category",
        icon: <Category className="text-[#00927c]"/>,
        activeIcon: <Category className="text-white"/>,
    },
    {
        name:"Deals",
        path:"/admin/deals",
        icon: <LocalOffer className="text-[#00927c]"/>,
        activeIcon: <LocalOffer className="text-white"/>,
    },
]

const menu2=[
    {
        name:"Account",
        path:"/seller/account",
        icon: <AccountBox className="text-[#00927c]"/>,
        activeIcon: <AccountBox className="text-white"/>,
    },
    {
        name:"Logout",
        path:"/",
        icon: <Logout className="text-[#00927c]"/>,
        activeIcon: <Logout className="text-white"/>,
    },
]
const AdminDrawerList = ({ toggleDrawer}:any)=>{
    return(
        <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer}/>
    )
}

export default AdminDrawerList