export class studentType {
  constructor(id: string, classId: string, studentName: string, className: string) {
    this.id = id;
    this.classId = classId;
    this.studentName = studentName;
    this.className = className;
  }
  id: string;
  classId: string;
  studentName: string;
  className: string;
}
