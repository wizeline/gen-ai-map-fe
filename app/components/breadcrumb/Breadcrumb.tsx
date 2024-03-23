import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface Props {
    path: string[];
}

export const Breadcrumb: React.FC<Props> = ({ path }: Props) => {
    return (
        <div className="flex items-center border border-top-nav-border rounded h-9 p-2 bg-primary h-[36px]">
            <span className="text-white font-montserrat font-bold text-xs leading-4 cursor-pointer">Home</span>
            {path.map((pathSegment, index) => (
                <React.Fragment key={index}>
                    <NavigateNextIcon className="w-5 h-5 !fill-white cursor-pointer mx-2" />
                    <span className="text-white font-montserrat font-bold text-xs leading-4 cursor-pointer">{pathSegment}</span>
                </React.Fragment>
            ))}
        </div>
    );
};
