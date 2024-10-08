
import CollaborativeRoom from '@/components/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.actions'
import { getClerkUsers } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import { User } from '@liveblocks/node'
import { redirect } from 'next/navigation'
import React from 'react'

const Document = async ({ params : { id }} : SearchParamProps) => {

	const clerkUser = await currentUser()
	if(!clerkUser) redirect('/sign-in');

	const room = await getDocument({
		roomId: id,
		userId: clerkUser.emailAddresses[0].emailAddress,
	});

	if(!room) redirect('/');

	const userAccesses = room.userAccesses ?? {};
	const userIds = Object.keys(userAccesses);
	const users = await getClerkUsers({userIds});

	const usersData = users.map((user: User) => ({
		...user,
		userType: userAccesses[user.email]?.includes('room:write')
		? 'editor'
		: 'viewer'
	}))

	const currentUserType = userAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';

	return (
		<main className='flex w-full flex-col items-center'>
			<CollaborativeRoom 
				roomId={id}
				roomMetadata={room.metadata}
				users={usersData}
				currentUserType={currentUserType}
			/>
		</main >
	)
}

export default Document