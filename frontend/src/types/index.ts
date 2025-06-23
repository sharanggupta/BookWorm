// GreenForked Types

export interface User {
  id: string;
  sub: string;
  email: string;
  image?: string;
  bio?: string;
  social?: string;
}

export interface Recipe {
  id: string;
  recipeName: string;
  cuisine: string;
  prepTime: number;
  serving: number;
  description: string;
  images: string[];
  ingredients: string[];
  instructions: string[];
  calories?: number;
  owner: User;
  categoryID: string;
  typename?: string;
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  recipeID: string;
  userID: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Like {
  id: string;
  recipeID: string;
  userID: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
} 