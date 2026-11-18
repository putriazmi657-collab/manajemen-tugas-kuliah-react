
export interface Task {
  id: number;
  title: string;
  description: string;
  subject: string;
  deadline: string;
  priority: "Rendah" | "Sedang" | "Tinggi";
  completed: boolean;
}
