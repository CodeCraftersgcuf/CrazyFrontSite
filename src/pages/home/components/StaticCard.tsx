import React from 'react'

interface props {
    title: string
    img: string
}

const StaticCard: React.FC<props> = ({img,title}) => {
    return (
        <div className='flex flex-col items-center justify-center gap-2 bg-[#1F2030] p-4 rounded-lg'>
            <img src={img} alt={title} className='w-16 h-16' />
            <h2 className='text-white text-lg font-semibold'>{title}</h2>
        </div>
    )
}

export default StaticCard