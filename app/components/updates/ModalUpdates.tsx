import React from 'react';
import { Notification } from '~/types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CircleIcon from '@mui/icons-material/Circle';

interface ModalUpdatesProps {
  notifications: Notification[];
  onClose: () => void;
}

export const ModalUpdates: React.FC<ModalUpdatesProps> = ({ notifications, onClose }) => {
  return (
    <div className="w-[280px] h-64 max-h-64 border border-top-nav-border rounded overflow-hidden">
      <div className="flex justify-between items-center bg-primary text-white p-2 rounded-t">
      <h2 className="ml-2 font-bold text-sm leading-normal font-montserrat">What’s new?</h2>
        <IconButton className="!p-0" onClick={onClose}>
          <CloseIcon className="!fill-white"/>
        </IconButton>
      </div>
      <div className="overflow-y-auto h-full p-6 bg-secondary">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start pb-2">
            <div className="flex flex-col items-center mr-4">
              <CircleIcon className='!fill-blue700 !w-[10px] !h-[10px]' />
              <div className="h-[68px] w-0.5 bg-blue700"></div>
            </div>
            <div className="h-[68px]">
              <p className="text-xs font-light leading-3 text-blue300 overflow-hidden mb-2">{new Date(notification.date).toLocaleDateString()}</p>
              <a href={"/"} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-400 overflow-hidden">{notification.description}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
