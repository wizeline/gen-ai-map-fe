import React from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Badge, IconButton } from '@mui/material';

interface Props {
	newNotifications: boolean;
}

export const TopNavigation: React.FC<Props> = ({ newNotifications }: Props) => {
 
	return (
	<div className="flex justify-between items-center border border-top-nav-border rounded w-28 h-9 p-2 bg-primary">
		<IconButton className="!p-0" onClick={() => {}}>
			<HelpOutlineOutlinedIcon className="w-5 h-5 !fill-white cursor-pointer" />	
		</IconButton>
		<IconButton className="!p-0" onClick={() => {}}>
			<ShareOutlinedIcon className="w-5 h-5 !fill-white cursor-pointer" />
		</IconButton>
		<IconButton className="!p-0" onClick={() => {}}>
			{ !newNotifications ? <NotificationsOutlinedIcon className="w-5 h-5 !fill-white cursor-pointer" />
			: 
				<Badge
					overlap="circular"
					variant="dot"
					color="error"
					invisible={!newNotifications}
				>
					<NotificationsOutlinedIcon className="w-5 h-5 !fill-white cursor-pointer" />
				</Badge> } 
		</IconButton>
	</div>
	);
};