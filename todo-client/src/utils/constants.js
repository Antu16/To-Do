export const routesInformation = {
    login: {
        path: "/login",
        exact: true,
        title: "Login"
    },
    home:{
        
        path: "/",
        exact: false,
        title: "Home"
    },
    addTodo: {
        path: "/add-todo",
        exact: true,
        title: "Add Todo"
    }
}


export const roles = {
    user: "ROLE_USER",
    admin: "ROLE_ADMIN"
}