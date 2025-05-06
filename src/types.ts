export type Role = 'Employee' | 'Lead' | 'Manager';

export type Priority = 'Medium' | 'Highest' | 'Critical';
export type Status = 'In Progress' | 'To Do' | 'Completed';

export interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	signingIn: boolean;
	login: (response: LoggedUser) => void;
	logout: () => void;
}

export interface StoreState {
	user: User | null;
	userLogout: boolean;
	isAuthenticated: boolean;
	signingIn: boolean;
	currentPage: string;
}

export interface TaskAnalyticsData {
	day: string;
	tasks: number;
}

export interface TaskDataType {
	taskName: string;
	dueDate: Date;
	priority: Priority;
	status: Status;
}

export interface BaseSelectInput {
	id: number;
	tag: string;
}

export interface Credentials {
	email: string;
	password: string;
	rememberUser: boolean;
}

export interface User {
	id: string;
	username: string;
	email: string;
	role: Role;
	isVerified: boolean;
	rememberUser: boolean;
}

export interface LoggedUser {
	message: string;
	user: User;
}

export interface CurrentPage {
	page: string;
}

export interface AuthenticatedUser {
	isAuthenticated: boolean;
	user: User | null;
}

export interface RegisterForm {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
	role: Role;
}

export type RegisterUser = Omit<RegisterForm, 'confirmPassword'>;

export interface NewTask extends TaskDataType {
	id: string;
	slug: string;
	user: {
		username: string;
		email: string;
	};
}

export interface RegisterResponse {
	message: string;
}

export interface MessageResponse {
	message: string;
}

export interface ErrorResponse {
	error: string;
}

export interface Resend {
	email: string;
}
