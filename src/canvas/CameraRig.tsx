import {useFrame} from '@react-three/fiber'
import {easing} from 'maath'
import { useSnapshot } from 'valtio'
import {useRef} from 'react'

import state from '../store'
import { PerspectiveCamera } from '@react-three/drei'

const CameraRig = ({children}: {children: any}) => {
    const group = useRef<any>(null)
    const snap = useSnapshot(state)




    useFrame((state, delta) => {
        const isBreakpoint = window.innerWidth <= 1260
        const isMobile = window.innerWidth <= 600
        console.log(state.pointer.x)
        let targetPosition: any= [-0.4, 0, 2]

        if(snap.intro){
            if(isBreakpoint) targetPosition = [0,0,2];
            if(isMobile) targetPosition = [0,0.2,2,5]

        }else{
            if(isMobile) targetPosition = [0,0,2.5]
            else targetPosition = [0,0,2]
        }

        easing.damp3(state.camera.position, targetPosition, 0.25, delta)

        if(group.current){
            easing.dampE(group.current.rotation, [state.pointer.y * Math.PI/2, -state.pointer.x *  Math.PI/2, 0], 0.25,delta)
        }
    })

    return (
        <group ref={group}>            
            
            {children}</group>

    )
}

export default CameraRig