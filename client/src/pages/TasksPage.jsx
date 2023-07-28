import { useAuth } from "../context/AuthContex"


export function TasksPage(){
    const {user} = useAuth()
    console.log(user)
    return(
        <>
            <p>Tasks Page</p>
        </>
    )
}