export interface EventCardProps {
	event: {
		event_id: number;
		event_title: string;
		event_date_time: string;
		event_description: string;
		book_id: string;
		signed_up:boolean;
	};
	book?:any;
}

export const events = [
	{
		event_id: 1,
		event_title: "Stephenie Meyer Meet & Greet",
		event_date_time: "24-10-2025",
		event_description:
			"Meet the author of the best-selling vampire book series and get books signed.",
		book_id: "lGjFtMRqp_YC",
		signed_up:false,
	},
	{
		event_id: 2,
		event_title: "Mate Midnight Book Release Party",
		event_date_time: "01-11-2025",
		event_description:
			"Get your copy of the highly anticipated sequel to Bride by Ali Hazelwood, freebies are limited.",
		book_id: "ztdIEQAAQBAJ",
		signed_up:false,
	},
	{
		event_id: 3,
		event_title: "People We Meet On Vacation Watch Party",
		event_date_time: "09-01-2026",
		event_description: "Come and watch the Netflix movie adaptaion with us!",
		book_id: "xWNjEAAAQBAJ",
		signed_up:false,
	},
];
