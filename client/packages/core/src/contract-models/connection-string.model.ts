export type ConnectionStringModel = {
	server: string;
	user: string;
	password: string;
	database: string;
	trusted_Connection: boolean;
	multipleActiveResultSets: boolean;
};
