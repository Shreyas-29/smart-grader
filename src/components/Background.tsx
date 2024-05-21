import React from 'react'

interface Props{
    children?: React.ReactNode
}

const Background = ({children}: Props) => {
    return (
        <div className="min-h-screen w-full bg-background">
            <div className="absolute inset-0 z-20 bg-grid-small-black/[0.2] hidden lg:flex"></div>
            <div className="absolute z-20 pointer-events-none inset-0 hidden lg:flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            {children}
        </div>
    )
};

export default Background
