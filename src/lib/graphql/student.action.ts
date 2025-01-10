import { gql } from '@apollo/client';

const CREATE_STUDENT = gql`
  mutation CreateStudent($studentName: String!, $classId: String!) {
    createStudent(createStudentInput: { studentName: $studentName, classId: $classId }) {
      studentName
      classId
    }
  }
`;

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

const DELETE_A_STUDENT = gql`
  mutation RemoveStudents($id: String!) {
    removeStudents(id: $id) {
      message
    }
  }
`;
export {
  GET_ALL_STUDENTS,
  CREATE_STUDENT,
  DELETE_A_STUDENT,
  GET_STUDENT_BYID,
  GET_STUDENT_BYCLASSNAME,
  GET_STUDENT_BY_STUDENTNAME,
};
