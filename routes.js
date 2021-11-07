import Home from "./src/components/Home";
import User from "@/components/User";

export const routes = [
    { path:"/", component: Home, name: "home"},
    { path:"/user/:id", component: User, name: "user" }
]