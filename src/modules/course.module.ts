export class Course {
    // private static count:number=0;
    // public id;
    constructor(
        public title: string,
        public description: string,
        public teacherId: number,
        public id?: number,
    ) { 
        // this.id=Course.count++;
    }
}
