export type TCategory = {
  id: string;
  catName: string;
};

export type TPost = {
  id: string;
  title: string;
  content: string;
  links: null | string[];
  catName?: string;
  imageUrl?: string;
  publicId?: string;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
  };
};
