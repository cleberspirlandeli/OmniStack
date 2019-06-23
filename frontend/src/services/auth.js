export const isAuthenticated = () => {
    return localStorage.getItem("x-token") ? true : false;
}
