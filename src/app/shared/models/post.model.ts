export class Post {
  author: {
    avatar: string;
    name: string;
    type?: string;
    id?: string;
  };
  body: string;
  title: string;
  image?: string;
  id?: string;
  constructor(
    author: {
      avatar: string;
      name: string;
      type: string;
      id: string;
    },
    body: string,
    title: string,
    image?: string,
    id?: string
  ) {
      this.author = author;
      this.body = body;
      this.title = title;
      this.id = id;
      this.image = image;
  }
}
