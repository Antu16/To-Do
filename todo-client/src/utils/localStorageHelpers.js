export const LOCAL_STORAGE_USER_KEY = "loggedInUser";

export const saveToLocalStorage = (key, data)=>{
    try{
        localStorage.setItem(key, JSON.stringify(data));
    }catch(e){
        console.log(e);
    }
}

export const getLocalUserData = ()=>{
    let localStorageUser = null;
    try{
        const data = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
        console.log({data});
        localStorageUser = JSON.parse(data);
    }catch(e){
        console.log(e);
    }

    return localStorageUser;
}