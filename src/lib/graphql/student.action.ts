import { gql } from '@apollo/client';

const GET_ALL_STUDENTS = gql`
  query {
    findAllStudent {
      id
      classId
      studentName
      className
    }
  }
`;

const GET_STUDENT_BYID = gql`
  query findOneStudent($id: String!) {
    findOneStudent(id: $id) {
      id
      classId
      studentName
    }
  }
`;

const GET_STUDENT_BYCLASSNAME = gql`
  query findByClassname($className: String!) {
    findByClassname(className: $className) {
      id
      studentName
      className
    }
  }
`;

const GET_STUDENT_BY_STUDENTNAME = gql`
  query findLIKEByStudentName($studentName: String!) {
    findLIKEByStudentName(studentName: $studentName) {
      id
      studentName
      className
    }
  }
`;
export { GET_ALL_STUDENTS, GET_STUDENT_BYID, GET_STUDENT_BYCLASSNAME, GET_STUDENT_BY_STUDENTNAME };
