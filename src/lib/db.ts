import { Book, Member, BookIssue, MOCK_BOOKS, MOCK_MEMBERS } from "./data";

const STORAGE_KEYS = {
  BOOKS: "elibrary_books",
  MEMBERS: "elibrary_members",
  ISSUES: "elibrary_issues",
  REQUESTS: "elibrary_requests",
  INITIALIZED: "elibrary_initialized",
  CURRENT_USER: "elibrary_current_user",
};

// --- Storage Helpers ---

const getFromStorage = <T>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) return defaultValue;
  try {
    return JSON.parse(stored) as T;
  } catch (e) {
    console.error(`Error parsing storage key ${key}:`, e);
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- Initialization ---

export const initializeDatabase = () => {
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  
  if (!isInitialized) {
    saveToStorage(STORAGE_KEYS.BOOKS, MOCK_BOOKS);
    saveToStorage(STORAGE_KEYS.MEMBERS, MOCK_MEMBERS);
    saveToStorage(STORAGE_KEYS.ISSUES, []);
    saveToStorage(STORAGE_KEYS.REQUESTS, []);
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
    console.log("Database initialized with mock data.");
  }
};

// --- Database Service ---

export const db = {
  // --- Books ---
  getBooks: (): Book[] => {
    initializeDatabase();
    return getFromStorage<Book[]>(STORAGE_KEYS.BOOKS, []);
  },
  
  addBook: (book: Omit<Book, "id">): Book => {
    const books = db.getBooks();
    const newBook = { ...book, id: Math.random().toString(36).substr(2, 9) };
    saveToStorage(STORAGE_KEYS.BOOKS, [...books, newBook]);
    return newBook;
  },

  updateBook: (updatedBook: Book) => {
    const books = db.getBooks();
    saveToStorage(STORAGE_KEYS.BOOKS, books.map(b => b.id === updatedBook.id ? updatedBook : b));
  },

  deleteBook: (id: string) => {
    const books = db.getBooks();
    saveToStorage(STORAGE_KEYS.BOOKS, books.filter(b => b.id !== id));
  },

  // --- Members ---
  getMembers: (): Member[] => {
    initializeDatabase();
    return getFromStorage<Member[]>(STORAGE_KEYS.MEMBERS, []);
  },

  getMemberByEmail: (email: string): Member | undefined => {
    return db.getMembers().find(m => m.email.toLowerCase() === email.toLowerCase());
  },

  addMember: (member: Omit<Member, "id" | "joinDate" | "status">): Member => {
    const members = db.getMembers();
    const newMember: Member = {
      ...member,
      id: Math.random().toString(36).substr(2, 9),
      joinDate: new Date().toISOString().split("T")[0],
      status: "active" // Default status
    };
    saveToStorage(STORAGE_KEYS.MEMBERS, [...members, newMember]);
    return newMember;
  },

  updateMember: (updatedMember: Member) => {
    const members = db.getMembers();
    saveToStorage(STORAGE_KEYS.MEMBERS, members.map(m => m.id === updatedMember.id ? updatedMember : m));
  },

  // --- Issues ---
  getIssues: (): BookIssue[] => {
    initializeDatabase();
    return getFromStorage<BookIssue[]>(STORAGE_KEYS.ISSUES, []);
  },

  addIssue: (issue: Omit<BookIssue, "id" | "issueDate">): BookIssue => {
    const issues = db.getIssues();
    const newIssue: BookIssue = {
      ...issue,
      id: Math.random().toString(36).substr(2, 9),
      issueDate: new Date().toISOString().split("T")[0],
    };
    saveToStorage(STORAGE_KEYS.ISSUES, [...issues, newIssue]);
    return newIssue;
  },
  returnIssue: (issueId: string): void => {
    const issues = db.getIssues();
    const updated = issues.map(i => 
      i.id === issueId ? { ...i, returnDate: new Date().toISOString().split("T")[0] } : i
    );
    saveToStorage(STORAGE_KEYS.ISSUES, updated);
  },

  // --- Requests ---
  getRequests: (): any[] => {
    initializeDatabase();
    return getFromStorage<any[]>(STORAGE_KEYS.REQUESTS, []);
  },

  addRequest: (request: Omit<any, "id" | "requestDate" | "status">): any => {
    const requests = db.getRequests();
    const newRequest: any = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      requestDate: new Date().toISOString().split("T")[0],
      status: "pending"
    };
    saveToStorage(STORAGE_KEYS.REQUESTS, [...requests, newRequest]);
    return newRequest;
  },

  updateRequestStatus: (requestId: string, status: "pending" | "fulfilled" | "cancelled") => {
    const requests = db.getRequests();
    const updated = requests.map(r => r.id === requestId ? { ...r, status } : r);
    saveToStorage(STORAGE_KEYS.REQUESTS, updated);
  }
};

export const auth = {
  login: (member: Member) => {
    saveToStorage(STORAGE_KEYS.CURRENT_USER, member);
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
  getCurrentUser: (): Member | null => {
    return getFromStorage<Member | null>(STORAGE_KEYS.CURRENT_USER, null);
  },
};
