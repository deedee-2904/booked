export interface User {
	username: string;
	password: string;
	isAdmin: boolean;
}

export const users = [
	{
		username: "admin",
		password: "1234",
		isAdmin:true
	},
	{
		username: "customer",
		password: "abcd",
		isAdmin:false
	},
];
