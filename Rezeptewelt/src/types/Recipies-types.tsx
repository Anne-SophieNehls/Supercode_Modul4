export type Recipies =
  | {
      category_id: string | null;
      created_at: string | null;
      created_by: string;
      description: string;
      id: string;
      image_url: string | null;
      instructions: string;
      name: string;
      rating: number | null;
      servings: number;
      categories: {
        created_at: string;
        id: string;
        name: string | null;
      } | null;
    }[]
  | null;
