import React,{useContext} from 'react'
import { SearchedUsers } from '../../Context/Context'

const HomePage: React.FC = () => {
    const {Users,setUsers} = useContext(SearchedUsers)
console.log('user is',Users)
    return (
        <div>
            <button >click</button>
        </div>
    )
}

export default HomePage
