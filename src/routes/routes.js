'use strict'

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import ProductDetails from "@/pages/ProductDetails.vue";
import TableList from "@/pages/TableList.vue";
import Favorites from "@/pages/Favorites.vue"
import RestorePass from "../pages/UserProfile/RestorePass.vue"

const routes = [{

    path: '/',
    component: DashboardLayout,
    redirect: "/productos",
    children: [{
            path: 'productos',
            name: 'Productos',
            component: Dashboard
        },
        {
            path: "user",
            name: "Datos del usuario",
            component: UserProfile,
        },
        {
            path: "restorepass",
            component: RestorePass,
            name: "Reseteo de Contraseña"
        },
        {
            path: "mispedidos",
            component: TableList,
            name: "Mis Pedidos",
        },
        {
            path: 'favorites',
            component: Favorites,
            name: 'Mis Favoritos',
        },
        {
            path: 'productDetails',
            component: ProductDetails,
            name: 'Detalles del Producto',
            props: true
        },
    ],
    path: '*',
    component: DashboardLayout,
}];

export default routes;