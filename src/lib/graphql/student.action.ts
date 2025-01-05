import { gql } from '@apollo/client';

const GET_ALL_STUDENTS = gql`
  query {
    findAllStudent {
      id
      classId
      studentName
    }
  }
`;

const GET_STUDENT_BYID = gql`
query findOneStudent($id: String!){
    findOneStudent (id: $id){
        id
        classId
        studentName
    }
}
`
export { GET_ALL_STUDENTS, GET_STUDENT_BYID };
