import React from 'react'


interface DropdownProps {
    children: React.ReactNode;
    instructions?: string;
}
const Dropdown: React.FC<DropdownProps> = ({ children,instructions }) => {
    return (
        <div className='relative'>
            {children}
            <div className='absolute z-[50] top-full right-0 bg-[#101828] rounded-lg shadow-lg p-4 w-64'>
                {instructions}
            </div>
        </div>
    )
}

export default Dropdown