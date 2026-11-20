
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Mengambil seluruh artikel
export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Gagal mengambil data artikel.");
  }

  return response.json();
};

// Mengambil detail artikel berdasarkan ID
export const getPostById = async (id: number): Promise<Post> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Artikel tidak ditemukan.");
  }

  return response.json();
};
