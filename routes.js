import Home from "./src/components/Home";
import User from "@/components/User";
import UserDetail from "@/components/UserDetail";
import UserEdit from "@/components/UserEdit";
import UserStart from "@/components/UserStart";

export const routes = [
    {path: "/", component: Home, name: "home"},
    {
        path: "/user", component: User, name: "user", children: [
            {path: "/", component: UserStart},
            {path: "/:id", component: UserDetail},
            {path: "/:id/edit", component: UserEdit},
        ]
    }
]