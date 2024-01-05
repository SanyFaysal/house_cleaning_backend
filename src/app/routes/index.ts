import express from 'express';
import { UserRoutes } from "../modules/user/user.route";
import { CategoryRoutes } from '../modules/category/category.route';
import { ServiceRoutes } from '../modules/service/service.route';


const router = express.Router();


const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/category',
        route: CategoryRoutes
    },
    {
        path: '/service',
        route: ServiceRoutes
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));


export default router;
