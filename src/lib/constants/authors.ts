export interface Author {
	name: string;
	image: string;
  }

export const authors:Author[] = [
  {
    name: "Devin",
    image: "/authors/Devin.jpeg",
  },
  {
    name: "Elizabeth",
    image: "/authors/Elizabeth.png",
  },
  {
    name: "Evan",
    image: "/authors/Evan.jpeg",
  },
  {
    name: "François",
    image: "/authors/François.jpeg",
  },
  {
    name: "Iron",
    image: "/authors/Iron.jpeg",
  },
  {
    name: "Emma",
    image: "/authors/Ivy.jpeg",
  },
  {
	name: "Lio",
	image: "/authors/Lio.jpg",
  },
  {
	name: "Mars",
	image: "/authors/Mars.jpeg",
   },
   {
	name: "nullptr",
	image: "/authors/nullptr.webp",
   },
   {
	name: "Wander",
	image: "/authors/Wander.jpeg",
   },
];

export const getAuthor = (name: string): Author => authors.filter((author) => author.name === name)[0]

export const getAuthors = (names: string[]): Author[] =>  names.map((name) => getAuthor(name))