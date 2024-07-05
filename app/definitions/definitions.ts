export interface CollegeAttended {
  from: string;
  to: string;
  college: string;
  city: string;
  state: string;
}

export interface CollegeSport {
  sport: string;
  college: string;
  varsity: string;
  semester: string;
  year: string;
}

export type FormValues = {
  presentCollege: string;
  presentConference: string;
  sportThisSeason: string;
  previousSeasons: string;
  firstName: string;
  lastName: string;
  middleInitial: string;
  gender: string;
  studentId: string;
  todaysDate: Date;
  address: string;
  telephone?: string;
  dateOfBirth: Date;
  highSchool: string;
  lastDateAttended: Date;
  collegesAttended: {
    from: Date;
    to: Date;
    college: string;
    city: string;
    state: string;
  }[];
  collegeSports: {
    sport: string;
    college: string;
    varsity: string;
    semester: string;
    year: string;
  }[];
};

export interface StudentData {
  firstName: string;
  lastName: string;
  gender: string;
  id: string;
}

export type ViewFormValues = {
  firstName: string;
  lastName: string;
  gender: string;
  id: string;
};
