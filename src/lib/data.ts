export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  category: string;
  stock: number;
  coverUrl?: string;
  description?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  status: "active" | "pending" | "deactive";
  joinDate: string;
}

export interface BookIssue {
  id: string;
  bookId: string;
  memberId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fine?: number;
}

export const MOCK_BOOKS: Book[] = [
  { id: "1", title: "Introduction to Algorithms", author: "Thomas H. Cormen", publisher: "MIT Press", isbn: "978-0262033848", category: "Computer Science", stock: 5, description: "A comprehensive textbook covering a broad range of algorithms." },
  { id: "2", title: "Database System Concepts", author: "Abraham Silberschatz", publisher: "McGraw Hill", isbn: "978-0078022159", category: "Computer Science", stock: 3, description: "Comprehensive introduction to database systems." },
  { id: "3", title: "Clean Code", author: "Robert C. Martin", publisher: "Prentice Hall", isbn: "978-0132350884", category: "Software Engineering", stock: 7, description: "A handbook of agile software craftsmanship." },
  { id: "4", title: "The Art of Computer Programming", author: "Donald E. Knuth", publisher: "Addison-Wesley", isbn: "978-0201896831", category: "Computer Science", stock: 2, description: "Fundamental algorithms and data structures." },
  { id: "5", title: "Design Patterns", author: "Gang of Four", publisher: "Addison-Wesley", isbn: "978-0201633610", category: "Software Engineering", stock: 4, description: "Elements of reusable object-oriented software." },
  { id: "6", title: "Computer Networks", author: "Andrew S. Tanenbaum", publisher: "Pearson", isbn: "978-0132126953", category: "Networking", stock: 6, description: "A comprehensive guide to computer networking." },
  { id: "7", title: "Operating System Concepts", author: "Abraham Silberschatz", publisher: "Wiley", isbn: "978-1118063330", category: "Operating Systems", stock: 4, description: "In-depth coverage of OS design and implementation." },
  { id: "8", title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", publisher: "Pearson", isbn: "978-0136042594", category: "AI", stock: 3, description: "The leading textbook in Artificial Intelligence." },
];

export const MOCK_MEMBERS: Member[] = [
  { id: "1", name: "John Mukasa", email: "john@ksc.edu", role: "student", status: "active", joinDate: "2024-09-01" },
  { id: "2", name: "Grace Atuhaire", email: "grace@ksc.edu", role: "student", status: "active", joinDate: "2024-09-15" },
  { id: "3", name: "Peter Ochieng", email: "peter@ksc.edu", role: "student", status: "pending", joinDate: "2024-10-01" },
  { id: "4", name: "Sarah Namuli", email: "sarah@ksc.edu", role: "student", status: "active", joinDate: "2024-08-20" },
  { id: "5", name: "David Tumwine", email: "david@ksc.edu", role: "student", status: "deactive", joinDate: "2024-07-10" },
];

export const CATEGORIES = ["All", "Computer Science", "Software Engineering", "Networking", "Operating Systems", "AI"];
