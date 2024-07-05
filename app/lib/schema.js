import * as yup from "yup";

export const formSchema = yup.object().shape({
  presentCollege: yup.string().required("Present College is required"),
  presentConference: yup.string().required("Present Conference is required"),
  sportThisSeason: yup.string().required("Sport This Season is required"),
  previousSeasons: yup.string().required("Previous Seasons is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  middleInitial: yup.string(),
  gender: yup.string().required("Gender is required"),
  studentId: yup.string().required("Student ID is required"),
  todaysDate: yup
    .date()
    .required("Today's Date is required")
    .test("today", "Date must be today.", (value) => {
      return new Date().getDate() === new Date(value).getDate();
    }),
  address: yup.string().required("Address is required"),
  telephone: yup
    .string()
    .optional()
    .matches(/^[0-9]{11}$/, "Phone number is not valid"),
  dateOfBirth: yup
    .date()
    .required("Date of Birth is required")
    .test("age", "You must be at least 18 years old", (value) => {
      return new Date().getFullYear() - value.getFullYear() >= 18;
    }),
  highSchool: yup.string().required("High School Last Attended is required"),
  lastDateAttended: yup
    .date()
    .required("Last Date Attended is required")
    .test("exceed today", "Date must not exceed today.", (value) => {
      return new Date().getDate() >= new Date(value).getDate();
    }),
  collegesAttended: yup
    .array()
    .of(
      yup.lazy((value) => {
        const hasValues = Object.values(value).some(
          (v) =>
            (v !== "" && v !== null && v !== undefined) ||
            Object.values(v).some((vi) => {
              vi !== "" && vi !== null && vi !== undefined;
            })
        );

        if (hasValues) {
          return yup.object().shape({
            from: yup.date().required("From date is required"),
            to: yup
              .date()
              .required("End date is required")
              .min(yup.ref("from"), "End date cannot be before start date"),
            college: yup.string().required("College is required"),
            city: yup.string().required("City is required"),
            state: yup.string().required("State is required"),
          });
        }

        return yup.object().shape({
          from: yup
            .date()
            .transform((value, originalValue) => {
              return originalValue === "" ? undefined : value;
            })
            .notRequired(),
          to: yup
            .date()
            .transform((value, originalValue) => {
              return originalValue === "" ? undefined : value;
            })
            .notRequired(),
          college: yup.string().notRequired(),
          city: yup.string().notRequired(),
          state: yup.string().notRequired(),
        });
      })
    )
    .optional(),
  collegeSports: yup
    .array()
    .of(
      yup.lazy((value) => {
        const hasValues = Object.values(value).some(
          (v) => v !== "" && v !== null && v !== undefined
        );

        if (hasValues) {
          return yup.object().shape({
            sport: yup.string().required("Sport is required"),
            college: yup.string().required("College is required"),
            varsity: yup.string().required("Varsity is required"),
            semester: yup.string().required("Semester are required"),
            year: yup.string().required("Year is required"),
          });
        }

        return yup.object().shape({
          sport: yup.string().notRequired(),
          college: yup.string().notRequired(),
          varsity: yup.string().notRequired(),
          semester: yup.string().notRequired(),
          year: yup.string().notRequired(),
        });
      })
    )
    .optional(),
});

export const viewFormSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  gender: yup.string().required("Gender is required"),
  id: yup.string().required("Id is required"),
});
