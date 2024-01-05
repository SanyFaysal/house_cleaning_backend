import express from 'express';
import { UserRoutes } from "../modules/user/user.route";
import { CategoryRoutes } from '../modules/category/category.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { ScheduleRoutes } from '../modules/schedule/schedule.route';


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
    {
        path: '/schedule',
        route: ScheduleRoutes
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));


export default router;
