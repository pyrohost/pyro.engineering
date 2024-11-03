export default function toSlug(title: string) {
	
	return title
		.toLowerCase()
		.replace(/ /g, "-")
		.normalize("NFD")
		.replace(/[^a-z0-9-]/g, "");
};