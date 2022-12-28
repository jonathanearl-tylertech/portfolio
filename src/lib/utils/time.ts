export const convertDateTime = (date: string) => {
	const d = new Date(date);
	const time = d.getTime();
	const now = new Date().getTime();
	const minsSinceComment = (now - time) / 1000 / 60;
	if (minsSinceComment < 60) return `${Math.round(minsSinceComment)}m`;
	const hoursSinceComment = (now - time) / 1000 / 60 / 60;
	if (hoursSinceComment < 24) return `${Math.round(hoursSinceComment)}h`;
	const daysSinceComment = (now - time) / 1000 / 60 / 60 / 24;
	return `${Math.round(daysSinceComment)}d`;
};
