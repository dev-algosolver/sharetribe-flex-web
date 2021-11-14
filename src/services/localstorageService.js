export const setLSItem = (key,value)=>{
    localStorage.setItem(key,JSON.stringify(value))
}
const updateLSItem = ()=>{}
export const getLSItem = (key)=>{
    return JSON.parse(localStorage.getItem(key))
}
export const deleteLSItem = (key)=>{
    localStorage.removeItem(key)
}