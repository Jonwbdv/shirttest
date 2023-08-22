

import { useSnapshot } from 'valtio'
import state from '../store'

const CustomButton = ({type, title, customStyles, handleClick}: any) => {

    const snap = useSnapshot(state)

    const generateStyle = (type: any) => {
        if(type === "filled"){
            return {
                backgroundColor: "#EFBD48",
                color: "#fff"
            }
        }
        else if(type=== "outline"){
            return {
                borderWidth: '1px',
                borderColor: '#EFBD48',
                color: "#EFBD48"
            }
        }
    }

    return (

        <button onClick={handleClick} className={`px-2 py-1.5 rounded-md ${customStyles}`} style={generateStyle(type)}>{title}</button>
    )
}

export default CustomButton