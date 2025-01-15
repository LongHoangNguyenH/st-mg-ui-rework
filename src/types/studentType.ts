import { classType } from './classType';

export class studentType {
  constructor(id: string, studentName: string, cls: classType) {
    this.id = id;
    this.studentName = studentName;
    this.cls = cls;
  }

  id: string;
  studentName: string;
  cls: classType;
}
