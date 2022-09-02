import { createWebHistory, createRouter } from "vue-router";
import Redact from "@/listRedact.vue";
import MainComponent from "@/Main.vue"
const routes = [
    {
        path: "/",
        name: "Main",
        component: MainComponent,
    },
    {
        path: "/:id",
        name: "Redact",
        component: Redact,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
