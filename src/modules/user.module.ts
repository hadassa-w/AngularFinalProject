export class User {
    constructor(
        public name: string,         // שם המשתמש
        public email: string,        // כתובת דוא"ל של המשתמש
        public password: string,     // סיסמה של המשתמש
        public role: String,         // תפקיד המשתמש (student, teacher, admin)
        public id?: number           // ID של המשתמש
    ) { }
}
