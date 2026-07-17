import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  dob?: string;
  adminNotes?: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 'u-1001',
      firstName: 'John',
      lastName: 'Smith',
      password: 'hashed_pw_001',
      dob: '1990-05-12',
    },
    {
      id: 'u-1002',
      firstName: 'Emma',
      lastName: 'Wilson',
      password: 'hashed_pw_002',
      dob: '1988-11-03',
      adminNotes: 'VIP customer',
    },
    {
      id: 'u-1003',
      firstName: 'Liam',
      lastName: 'Chen',
      password: 'hashed_pw_003',
    },
    {
      id: 'u-1004',
      firstName: 'Olivia',
      lastName: 'Brown',
      password: 'hashed_pw_004',
      dob: '1995-02-27',
    },
    {
      id: 'u-1005',
      firstName: 'Noah',
      lastName: 'Davis',
      password: 'hashed_pw_005',
      adminNotes: 'Flagged for review',
    },
    {
      id: 'u-1006',
      firstName: 'Ava',
      lastName: 'Martinez',
      password: 'hashed_pw_006',
      dob: '1992-08-19',
    },
    {
      id: 'u-1007',
      firstName: 'William',
      lastName: 'Taylor',
      password: 'hashed_pw_007',
    },
    {
      id: 'u-1008',
      firstName: 'Sophia',
      lastName: 'Anderson',
      password: 'hashed_pw_008',
      dob: '1993-12-01',
    },
    {
      id: 'u-1009',
      firstName: 'James',
      lastName: 'Thomas',
      password: 'hashed_pw_009',
      adminNotes: 'Newsletter opt-out',
    },
    {
      id: 'u-1010',
      firstName: 'Isabella',
      lastName: 'Jackson',
      password: 'hashed_pw_010',
      dob: '1991-07-08',
    },
  ];
  getAllUsers(): User[] {
    return this.users;
  }
}
