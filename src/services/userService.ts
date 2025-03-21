import axios from 'axios';
import { DepartmentGroupSummary, User, UserResponse } from '../types/User';

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<UserResponse>('https://dummyjson.com/users');
        return response.data.users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const groupByDepartment = (users: User[]): DepartmentGroupSummary => {
    return users.reduce((groups: DepartmentGroupSummary, user: User) => {
        const department = user.company.department;

        if (!groups[department]) {
            groups[department] = {
                male: 0,
                female: 0,
                ageRange: '',
                hair: {},
                addressUser: {}
            };
        }

        // Count gender
        if (user.gender.toLowerCase() === 'male') {
            groups[department].male += 1;
        } else if (user.gender.toLowerCase() === 'female') {
            groups[department].female += 1;
        }

        // Track hair color
        const hairColor = user.hair.color;
        groups[department].hair[hairColor] = (groups[department].hair[hairColor] ?? 0) + 1;

        // Add user address
        const fullName = `${user.firstName} ${user.lastName}`;
        groups[department].addressUser[fullName] = user.address.postalCode;

        // Calculate age range per department
        const ages = users
            .filter(u => u.company.department === department)
            .map(u => u.age)
            .sort((a, b) => a - b);

        const minAge = ages[0];
        const maxAge = ages[ages.length - 1];
        groups[department].ageRange = `${minAge}-${maxAge}`;

        return groups;
    }, {});
};