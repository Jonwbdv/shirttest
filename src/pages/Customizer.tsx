
import React, {useState, useEffect} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config'
import download from '../assets/download.png'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { fadeAnimation, slideAnimation } from '../config/motion'


import CustomButton from '../components/CustomButton'
import AIPicker from '../components/AIPicker'
import ColorPicker from '../components/ColorPicker'
import FilePicker from '../components/FilePicker'
import Tab from '../components/Tab'

import state from '../store'

interface type1 { logo: { stateProperty: string; filterTab: string; }; full: { stateProperty: string; filterTab: string; }; }

const Customizer = () => {
    const snap = useSnapshot(state)

    const [file, setFile] = useState('')
    const [prompt, setPrompt] = useState('')
    const [generatingImg, setGeneratingImg] = useState(false)

    const [activeEditorTab, setActiveEditorTab] = useState('')
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false
    })

    //show tab content depending on active tab

    const generateTabContent = () => {
        switch(activeEditorTab){
            case "colorpicker":
                return <ColorPicker/>
                break
            case "filepicker":
                return <FilePicker file={file} setFile={setFile} readFile={readFile}/>
                break
            case "aipicker":
                return <AIPicker/>
            default:
                return null
            }
    }

    const handleDecals = (type: any, result : any) => {
        
        let decalType : any

        if(type == "logo"){
            decalType = DecalTypes.logo;
        }
        else if(type == "full"){
            decalType = DecalTypes.full
        }

        decalType.stateProperty = result

        if(type == "logo" && !activeFilterTab.logoShirt){
            handleActiveFilterTab(decalType.filterTab)
        }
        else if(type == "full" && !activeFilterTab.stylishShirt){
            handleActiveFilterTab(decalType.filterTab)
        }
    }

    const handleActiveFilterTab = (tabName : any) => {
        switch(tabName){
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab.logoShirt
                break
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab.stylishShirt
            default:
                state.isFullTexture = false
                state.isLogoTexture = true
        }
    }
    const readFile = (type : any) => {
        reader(file).then((result) => {
            handleDecals(type, result)
            setActiveEditorTab("")
        })
    }
    return (
        
        <AnimatePresence>
            {!snap.intro && (
                <>
                <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation('left')}>
                    <div className="flex items-center min-h-screen w-full">
                        <div className='editortabs-container tabs'>
                            {EditorTabs.map((tab) => {
                                return (
                                    <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)}/>
                                )
                            })} 
                            {generateTabContent()}
                        </div>
                    </div>

              </motion.div>  
                
                <motion.div className="absolute z-10 top-0 right-0" {...fadeAnimation}>
                        <CustomButton type="filled" title="Back Home" handleClick={() => state.intro = true} customStyles="w-fit px-4 py-2.5 font-bold text-sm"/>
                </motion.div>

                <motion.div className="filtertabs-container"  {...slideAnimation("up")}>
                            {FilterTabs.map((tab) => {
                                return (
                                    <Tab key={tab.name} tab={tab} isFilterTab isActiveTab="" handleClick={() => {}}/>
                                )
                            })} 
                </motion.div>
                </>

            )}
        </AnimatePresence>
    )   
}

export default Customizer