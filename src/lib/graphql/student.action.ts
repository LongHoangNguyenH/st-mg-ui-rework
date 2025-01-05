import { gql } from '@apollo/client';

const GETALLSTUDENTS = gql`
    query getAllStudents {
        findAllStudents {
            studentName
            className
            id
        }
    }
`;

export {
    GETALLSTUDENTS,
}
