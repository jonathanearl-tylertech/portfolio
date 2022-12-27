import { Component } from 'solid-js';
import { convertDateTime } from './utils/time';
import verificationBadge from './assets/icons/verification-badge.svg';

const commentList = [
	{
		name: 'Jonathan Earl',
		verified: true,
		comment: 'Happy holidays 🎄🎁',
		createdAt: '2022-12-26T23:48:00.927Z'
	}
];

const Comments: Component = () => {
	return (
		<>
			<header class="border-b-[1px]  py-[14px] pl-[16px] flex items-center">
				<img class="w-[32px]" src="/favicon.svg" />
				<span class="ml-[14px] text-sm font-semibold">Jonathan Earl</span>
				<img class="h-[12px] ml-[4px]" src={verificationBadge} />
			</header>
			{commentList.map((c) => (
				<div class="py-[14px] pl-[16px] text-sm flex items-start">
					<img class="w-[32px]" src="/favicon.svg" />
					<div class="ml-[14px]">
						<div class="flex items-center">
							<span class="font-semibold">{c.name}</span>
							{c.verified ? <img class="h-[12px] ml-[4px]" src={verificationBadge} /> : <></>}
							<span class="ml-[4px]">{c.comment}</span>
						</div>
						<div class="mt-[8px] mb-[4px] text-[12px] text-[rgb(142,142,142)]">
							{convertDateTime(c.createdAt)}
						</div>
					</div>
				</div>
			))}
		</>
	);
};
export default Comments;
