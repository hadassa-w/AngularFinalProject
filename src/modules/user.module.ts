export class User {
    // private static idCounter = 0; // משתנה סטטי לספירת ה-ID
    // public id: number; // שדה ID
    constructor(
        public name: string,         // שם המשתמש
        public email: string,        // כתובת דוא"ל של המשתמש
        public password: string,     // סיסמה של המשתמש
        public role: String,         // תפקיד המשתמש (student, teacher, admin)
        public id?: number           // ID של המשתמש
    ) {
        // User.idCounter++; // הגדלת המונה בכל יצירת אובייקט חדש
        // this.id = User.idCounter; // הגדרת ה-ID של המשתמש
    }
}
