'use strict'

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import ProductDetails from "@/pages/ProductDetails.vue";
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import TableList from "@/pages/TableList.vue";
import Favorites from "@/pages/Favorites.vue"
import Notifications from "@/pages/Notifications.vue"

const routes = [{
    mode: "history",
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [{
            path: "dashboard",
            name: "Dashboard",
            component: Dashboard
        },
        {
            path: "user",
            name: "User Profile",
            component: UserProfile
        },
        {
            path: "miscompras",
            component: TableList,
            name: "miscompras",
        },
        {
            path: 'favorites',
            component: Favorites,
            name: 'favorites',
        },
        {
            path: 'notifications',
            component: Notifications,
            name: 'notifications',
        },
        {
            path: 'productDetails',
            component: ProductDetails,
            name: 'productDetails',
            props: true
        },
        {
            path: "login",
            name: "login",
            component: Login
        },
        {
            path: "register",
            name: "register",
            component: Register
        }
    ]
}];

export default routes;