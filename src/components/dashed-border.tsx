import Plus from "./plus.tsx";

export default function DashedBorder() {
	return (
		<>
			<span className="absolute inset-0 border border-dashed bg-card border-card-border -z-10" />
			<Plus className="absolute top-[-2px] left-[-2px] fill-card-border" />
			<Plus className="absolute top-[-2px] right-[-2px] fill-card-border" />
			<Plus className="absolute bottom-[-2px] left-[-2px] fill-card-border" />
			<Plus className="absolute bottom-[-2px] right-[-2px] fill-card-border" />
		</>
	);
}
