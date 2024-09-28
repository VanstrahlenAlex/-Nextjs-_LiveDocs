"use client";
import React from 'react'
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense';
import Loader from '@/components/Loader';

const Provider = ({ children } : { children: React.ReactNode }) => {
	function getClerkUser() {
		throw new Error('Function not implemented.');
	}

	return (
			<LiveblocksProvider 
			// publicApiKey={"pk_dev_ddDiS…R0vbWu"}
				authEndpoint={"/api/liveblocks-auth"}
				resolveUsers={async({userIds}) => {
					// const users = await getClerkUser();
				}}
			>
					<ClientSideSuspense fallback={<Loader />}>
						{children}
					</ClientSideSuspense>
				
			</LiveblocksProvider>
	)
}

export default Provider