"use client";
// because of reach hooks

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

interface CollegeAttended {
  college: string;
  city: string;
  state: string;
}

interface CollegeSport {
  sport: string;
  year: string;
  honors: string;
}

type FormValues = {
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
  phoneNumber?: string;
  dateOfBirth: Date;
  highSchool: string;
  lastDateAttended: Date;
  collegesAttended: { college: string; city: string; state: string }[];
  collegeSports: { sport: string; year: string; honors: string }[];
};

const schema = yup.object().shape({
  presentCollege: yup.string().required("Present College is required"),
  presentConference: yup.string().required("Present Conference is required"),
  sportThisSeason: yup.string().required("Sport This Season is required"),
  previousSeasons: yup.string().required("Previous Seasons is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  middleInitial: yup.string(),
  gender: yup.string().required("Gender is required"),
  studentId: yup.string().required("Student ID is required"),
  todaysDate: yup.date().required("Today's Date is required"),
  address: yup.string().required("Address is required"),
  phoneNumber: yup
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
  lastDateAttended: yup.date().required("Last Date Attended is required"),
  collegesAttended: yup
    .array()
    .of(
      yup.object().shape({
        college: yup.string().required("College is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
      })
    )
    .optional(),
  collegeSports: yup
    .array()
    .of(
      yup.object().shape({
        sport: yup.string().required("Sport is required"),
        year: yup.string().required("Year is required"),
        honors: yup.string().required("Honors are required"),
      })
    )
    .optional(),
});

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
  });

  const [collegesAttended, setCollegesAttended] = useState<CollegeAttended[]>(
    []
  );
  const [collegeSports, setCollegeSports] = useState<CollegeSport[]>([]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post("/api/students");
      // const response = await axios.delete(`/api/students/7c71`);
      // const response = await axios.put("/api/students", {
      //   params: { id: "7c71" },
      // });
      toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error("Error submitting the form", error?.response?.message);
    }
  };

  const handleAddCollege = () => {
    setCollegesAttended([
      ...collegesAttended,
      { college: "", city: "", state: "" },
    ]);
  };

  const handleAddSport = () => {
    setCollegeSports([...collegeSports, { sport: "", year: "", honors: "" }]);
  };

  const handleRemoveCollege = (index: number) => {
    const newCollegesAttended = [...collegesAttended];
    newCollegesAttended.splice(index, 1);
    setCollegesAttended(newCollegesAttended);
  };

  const handleRemoveSport = (index: number) => {
    const newCollegeSports = [...collegeSports];
    newCollegeSports.splice(index, 1);
    setCollegeSports(newCollegeSports);
  };

  const fetchData = async () => {
    try {
      await axios.get("/api/students");
    } catch (error: any) {
      // console.log("err", error);
      toast.error("Error fetching the data", error?.data?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    //   <div className="flex">
    //     <div>
    //       <label htmlFor="presentCollege">Present College</label>
    //       <input
    //         {...register("presentCollege")}
    //         className="input input-bordered"
    //         id="presentCollege"
    //       />
    //       {errors.presentCollege && <p>{errors.presentCollege.message}</p>}
    //     </div>

    //     <div>
    //       <label>Present Conference</label>
    //       <input
    //         {...register("presentConference")}
    //         className="input input-bordered"
    //       />
    //       {errors.presentConference && (
    //         <p>{errors.presentConference.message}</p>
    //       )}
    //     </div>

    //     <div>
    //       <label>Sport This Season</label>
    //       <select
    //         {...register("sportThisSeason")}
    //         className="select select-bordered"
    //       >
    //         <option value="">Select Sport</option>
    //         <option value="Basketball">Basketball</option>
    //         <option value="Football">Football</option>
    //         <option value="Soccer">Soccer</option>
    //         <option value="Baseball">Baseball</option>
    //         {/* Add more options as needed */}
    //       </select>
    //       {errors.sportThisSeason && <p>{errors.sportThisSeason.message}</p>}
    //     </div>

    //     <div>
    //       <label>Previous Seasons of Completion Used in This Sport</label>
    //       <input type="radio" {...register("previousSeasons")} value="0" /> 0
    //       <input type="radio" {...register("previousSeasons")} value="1" /> 1
    //       <input type="radio" {...register("previousSeasons")} value="2" /> 2
    //       <input type="radio" {...register("previousSeasons")} value="3" /> 3
    //       {errors.previousSeasons && <p>{errors.previousSeasons.message}</p>}
    //     </div>
    //   </div>

    //   <div className="flex items-center">
    //     <div>
    //       <label>First Name</label>
    //       <input {...register("firstName")} className="input input-bordered" />
    //       {errors.firstName && <p>{errors.firstName.message}</p>}
    //     </div>
    //     <div>
    //       <label>Last Name</label>
    //       <input {...register("lastName")} className="input input-bordered" />
    //       {errors.lastName && <p>{errors.lastName.message}</p>}
    //     </div>
    //     <div>
    //       <label>Middle Initial</label>
    //       <input
    //         {...register("middleInitial")}
    //         className="input input-bordered"
    //       />
    //     </div>
    //     <div>
    //       <label>Gender</label>
    //       <input type="radio" {...register("gender")} value="Male" /> Male
    //       <input type="radio" {...register("gender")} value="Female" /> Female
    //       {errors.gender && <p>{errors.gender.message}</p>}
    //     </div>
    //     <div>
    //       <label>Student ID#</label>
    //       <input {...register("studentId")} className="input input-bordered" />
    //       {errors.studentId && <p>{errors.studentId.message}</p>}
    //     </div>
    //   </div>

    //   <div className="flex">
    //     <div>
    //       <label>Today’s Date</label>
    //       <input
    //         type="date"
    //         {...register("todaysDate")}
    //         className="input input-bordered"
    //       />
    //       {errors.todaysDate && <p>{errors.todaysDate.message}</p>}
    //     </div>
    //     <div>
    //       <label>Address</label>
    //       <input {...register("address")} className="input input-bordered" />
    //       {errors.address && <p>{errors.address.message}</p>}
    //     </div>
    //     <div>
    //       <label>Phone Number</label>
    //       <input
    //         {...register("phoneNumber")}
    //         className="input input-bordered"
    //       />
    //       {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
    //     </div>
    //     <div>
    //       <label>Date of Birth</label>
    //       <input
    //         type="date"
    //         {...register("dateOfBirth")}
    //         className="input input-bordered"
    //       />
    //       {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
    //     </div>
    //     <div>
    //       <label>High School Last Attended</label>
    //       <input {...register("highSchool")} className="input input-bordered" />
    //       {errors.highSchool && <p>{errors.highSchool.message}</p>}
    //     </div>
    //     <div>
    //       <label>Last Date Attended</label>
    //       <input
    //         type="date"
    //         {...register("lastDateAttended")}
    //         className="input input-bordered"
    //       />
    //       {errors.lastDateAttended && <p>{errors.lastDateAttended.message}</p>}
    //     </div>
    //   </div>
    //   <div>
    //     <label>Colleges Attended or Jobs Held, City, State</label>
    //     {/* Repeat the structure for the table rows here */}
    //     {/* For simplicity, let's render a few static rows */}
    //     {Array(4)
    //       .fill(0)
    //       .map((_, index) => (
    //         <div key={index} className="flex space-x-2">
    //           <input
    //             {...register(`collegesAttended.${index}.college`)}
    //             placeholder="College"
    //             className="input input-bordered"
    //           />
    //           <input
    //             {...register(`collegesAttended.${index}.city`)}
    //             placeholder="City"
    //             className="input input-bordered"
    //           />
    //           <input
    //             {...register(`collegesAttended.${index}.state`)}
    //             placeholder="State"
    //             className="input input-bordered"
    //           />
    //         </div>
    //       ))}
    //   </div>
    //   <div>
    //     <label>Colleges Sports</label>
    //     {/* Repeat the structure for the table rows here */}
    //     {/* For simplicity, let's render a few static rows */}
    //     {Array(4)
    //       .fill(0)
    //       .map((_, index) => (
    //         <div key={index} className="flex space-x-2">
    //           <input
    //             {...register(`collegeSports.${index}.sport`)}
    //             placeholder="Sport"
    //             className="input input-bordered"
    //           />
    //           <input
    //             {...register(`collegeSports.${index}.year`)}
    //             placeholder="Year"
    //             className="input input-bordered"
    //           />
    //           <input
    //             {...register(`collegeSports.${index}.honors`)}
    //             placeholder="Honors"
    //             className="input input-bordered"
    //           />
    //         </div>
    //       ))}
    //   </div>

    //   <button type="submit" className="btn btn-primary">
    //     Submit
    //   </button>
    // </form>
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="card mt-8 shadow-md">
        <div className="card-body">
          <h2 className="text-xl font-semibold mb-4">Student Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="form-control">
              <label htmlFor="presentCollege" className="label">
                Present College
              </label>
              <input
                type="text"
                {...register("presentCollege")}
                className="input input-bordered"
                id="presentCollege"
              />
              {errors.presentCollege && (
                <p className="text-error mt-1">
                  {errors.presentCollege.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="presentConference" className="label">
                Present Conference
              </label>
              <input
                type="text"
                {...register("presentConference")}
                className="input input-bordered"
                id="presentConference"
              />
              {errors.presentConference && (
                <p className="text-error mt-1">
                  {errors.presentConference.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="sportThisSeason" className="label">
                Sport This Season
              </label>
              <select
                {...register("sportThisSeason")}
                className="select select-bordered w-full"
                id="sportThisSeason"
              >
                <option value="">Select Sport</option>
                <option value="Basketball">Basketball</option>
                <option value="Football">Football</option>
                <option value="Soccer">Soccer</option>
                <option value="Baseball">Baseball</option>
                {/* Add more options as needed */}
              </select>
              {errors.sportThisSeason && (
                <p className="text-error mt-1">
                  {errors.sportThisSeason.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                Previous Seasons of Completion Used in This Sport
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register("previousSeasons")}
                  value="0"
                  id="previousSeasons0"
                />
                <label htmlFor="previousSeasons0">0</label>
                <input
                  type="radio"
                  {...register("previousSeasons")}
                  value="1"
                  id="previousSeasons1"
                />
                <label htmlFor="previousSeasons1">1</label>
                <input
                  type="radio"
                  {...register("previousSeasons")}
                  value="2"
                  id="previousSeasons2"
                />
                <label htmlFor="previousSeasons2">2</label>
                <input
                  type="radio"
                  {...register("previousSeasons")}
                  value="3"
                  id="previousSeasons3"
                />
                <label htmlFor="previousSeasons3">3</label>
              </div>
              {errors.previousSeasons && (
                <p className="text-error mt-1">
                  {errors.previousSeasons.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                  <label htmlFor="lastName" className="label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register("lastName")}
                    className="input input-bordered"
                    id="lastName"
                  />
                  {errors.lastName && (
                    <p className="text-error mt-1">{errors.lastName.message}</p>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="firstName" className="label">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register("firstName")}
                    className="input input-bordered"
                    id="firstName"
                  />
                  {errors.firstName && (
                    <p className="text-error mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="form-control">
                  <label htmlFor="middleInitial" className="label">
                    Middle Initial
                  </label>
                  <input
                    type="text"
                    {...register("middleInitial")}
                    className="input input-bordered"
                    id="middleInitial"
                  />
                </div>
                <div className="form-control">
                  <label className="label">Gender</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("gender")}
                      value="Male"
                      id="genderMale"
                    />
                    <label htmlFor="genderMale">Male</label>
                    <input
                      type="radio"
                      {...register("gender")}
                      value="Female"
                      id="genderFemale"
                    />
                    <label htmlFor="genderFemale">Female</label>
                  </div>
                  {errors.gender && (
                    <p className="text-error mt-1">{errors.gender.message}</p>
                  )}
                </div>
                <div className="form-control">
                  <label htmlFor="studentId" className="label">
                    Student ID#
                  </label>
                  <input
                    type="text"
                    {...register("studentId")}
                    className="input input-bordered"
                    id="studentId"
                  />
                  {errors.studentId && (
                    <p className="text-error mt-1">
                      {errors.studentId.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-control">
                <label htmlFor="todaysDate" className="label">
                  Today's Date
                </label>
                <input
                  type="date"
                  {...register("todaysDate")}
                  className="input input-bordered"
                  id="todaysDate"
                />
                {errors.todaysDate && (
                  <p className="text-error mt-1">{errors.todaysDate.message}</p>
                )}
              </div>
              <div className="form-control">
                <label htmlFor="address" className="label">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address")}
                  className="input input-bordered"
                  id="address"
                />
                {errors.address && (
                  <p className="text-error mt-1">{errors.address.message}</p>
                )}
              </div>
              <div className="form-control">
                <label htmlFor="phoneNumber" className="label">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("phoneNumber")}
                  className="input input-bordered"
                  id="phoneNumber"
                />
                {errors.phoneNumber && (
                  <p className="text-error mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label htmlFor="dateOfBirth" className="label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className="input input-bordered"
                  id="dateOfBirth"
                />
                {errors.dateOfBirth && (
                  <p className="text-error mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="form-control col-span-2">
              <label htmlFor="highSchool" className="label">
                High School Last Attended
              </label>
              <input
                type="text"
                {...register("highSchool")}
                className="input input-bordered"
                id="highSchool"
              />
              {errors.highSchool && (
                <p className="text-error mt-1">{errors.highSchool.message}</p>
              )}
            </div>

            <div className="form-control col-span-1">
              <label htmlFor="lastDateAttended" className="label">
                Last Date Attended
              </label>
              <input
                type="date"
                {...register("lastDateAttended")}
                className="input input-bordered"
                id="lastDateAttended"
              />
              {errors.lastDateAttended && (
                <p className="text-error mt-1">
                  {errors.lastDateAttended.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Colleges Attended</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="text-left">College</th>
                    <th className="text-left">City</th>
                    <th className="text-left">State</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {collegesAttended.map((college, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          {...register(`collegesAttended.${index}.college`)}
                          className="input input-bordered w-full"
                          placeholder="College"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          {...register(`collegesAttended.${index}.city`)}
                          className="input input-bordered w-full"
                          placeholder="City"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          {...register(`collegesAttended.${index}.state`)}
                          className="input input-bordered w-full"
                          placeholder="State"
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline btn-error"
                          onClick={() => handleRemoveCollege(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Add an empty row for adding new colleges */}
                  <tr>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="College"
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="City"
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="State"
                        disabled
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={handleAddCollege}
                      >
                        Add College
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* College Sports Section */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">College Sports</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="text-left">Sport</th>
                    <th className="text-left">Year</th>
                    <th className="text-left">Honors</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {collegeSports.map((sport, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          {...register(`collegeSports.${index}.sport`)}
                          className="input input-bordered w-full"
                          placeholder="Sport"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          {...register(`collegeSports.${index}.year`)}
                          className="input input-bordered w-full"
                          placeholder="Year"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          {...register(`collegeSports.${index}.honors`)}
                          className="input input-bordered w-full"
                          placeholder="Honors"
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline btn-error"
                          onClick={() => handleRemoveSport(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Add an empty row for adding new sports */}
                  <tr>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Sport"
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Year"
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Honors"
                        disabled
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={handleAddSport}
                      >
                        Add Sport
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button type="submit" className="btn btn-primary">
              Submit Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
