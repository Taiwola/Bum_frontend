import { AgencyType, Contact, UserType } from '@/types/types';
import React, { createContext, useContext, useEffect, useState } from 'react'


export type ModelData = {
    user?: UserType,
    contact?: Contact,
    agency?: AgencyType
}

type ModelContextType = {
    data: ModelData,
    isOpen: boolean,
    setOpen: (model:React.ReactNode, fetchData?:() => Promise<any> ) => void,
    setClose: () => void 
}

interface ModelProviderInterface {
    children: React.ReactNode
}




export const ModelContext = createContext<ModelContextType>({
    data: {},
    isOpen: false,
    setOpen: (model: React.ReactNode, fetchData?: () => Promise<any>) => {},
    setClose() {
        
    },
})


const ModelProvider: React.FC<ModelProviderInterface> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<ModelData>({})
    const [showingModal, setShowingModal] = useState<React.ReactNode>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const setOpen = async (model: React.ReactNode, fetchData?: () => Promise<any>) => {
        if (model) {
            if (fetchData) {
                setData({ ...data, ...(await fetchData()) } || {})
            }
            setShowingModal(model);
            setIsOpen(true);
        }
    }
    const setClose = () => {
        setIsOpen(false);
        setData({});
    }

    if (!isMounted) return null


    return <ModelContext.Provider value={{data, setOpen, setClose, isOpen }}>
        {children}
        {showingModal}
    </ModelContext.Provider>
}

export const useModal = () => {
    const context = useContext(ModelContext);
    if (!context) {
        throw new Error('UseModal must be used with the provider');
    }
    return context;
}

export default ModelProvider;