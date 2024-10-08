"use client";
import React from 'react'
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense';
import Loader from '@/components/Loader';
import { currentUser } from '@clerk/nextjs/server';
import { useUser } from '@clerk/nextjs';
import { getDocumentUsers } from '@/lib/actions/user.actions';

const Provider = ({ children } : { children: React.ReactNode }) => {

	const { user: clerkUser } = useUser();

	function getClerkUser() {
		throw new Error('Function not implemented.');
	}

	// function getClerkUser() {
	// 	throw new Error('Function not implemented.');
	// }

	return (
			<LiveblocksProvider 
			// publicApiKey={"pk_dev_ddDiS…R0vbWu"}
				authEndpoint={"/api/liveblocks-auth"}
				resolveUsers={async({userIds}) => {
					const users = await getClerkUser({ userIds});
					return users;	
				}}
				resolveMentionSuggestions={async({ text, roomId}) => {
					const roomUsers = await getDocumentUsers({ 
						roomId,
						currentUser: clerkUser?.emailAddresses[0].emailAddress!,
						text,
					});
					return roomUsers;
				}}
			>
					<ClientSideSuspense fallback={<Loader />}>
						{children}
					</ClientSideSuspense>
				
			</LiveblocksProvider>
	)
}

export default Provider