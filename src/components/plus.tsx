type PlusProps = {
	className?: string;
};

export default function Plus({ className }: PlusProps) {
	return (
		<svg
			width="5"
			height="5"
			viewBox="0 0 5 5"
			className={className}
			aria-hidden="true"
		>
			<path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
		</svg>
	);
}
