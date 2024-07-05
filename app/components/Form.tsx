"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import {
  CollegeAttended,
  CollegeSport,
  FormValues,
} from "../definitions/definitions";
import { formSchema } from "../lib/schema";
import Link from "next/link";

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema) as any,
  });

  const [collegesAttended, setCollegesAttended] = useState<CollegeAttended[]>(
    Array(4).fill({ from: "", to: "", college: "", city: "", state: "" })
  );

  const [collegeSports, setCollegeSports] = useState<CollegeSport[]>(
    Array(4).fill({
      sport: "",
      college: "",
      varsity: "",
      semester: "",
      year: "",
    })
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Filter out empty objects from collegeSports and collegesAttended array
    const cleanedCollegeSports = data.collegeSports.filter((item) => {
      return Object.values(item).some((value) => value !== "");
    });

    const cleanedCollegesAttended = data.collegesAttended.filter((item) => {
      return Object.values(item).some((value) => value !== "");
    });

    // Update the data object with cleaned arrays
    const cleanedData = {
      ...data,
      collegeSports: cleanedCollegeSports,
      collegesAttended: cleanedCollegesAttended,
    };

    try {
      const response = await axios.post("/api/students", cleanedData);
      toast.success(response?.data?.message);
    } catch (error: any) {
      console.log(error);
      toast.error(`${"Error fetching the data: " + error?.message}`);
    }
  };

  const handleAddCollege = async () => {
    setCollegesAttended([
      ...collegesAttended,
      { from: "", to: "", college: "", city: "", state: "" },
    ]);
  };

  const handleAddSport = () => {
    setCollegeSports([
      ...collegeSports,
      { sport: "", college: "", varsity: "", semester: "", year: "" },
    ]);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card mt-8">
      <div className="card-body p-0 ">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
          <h2 className="text-xl font-semibold mb-4">
            Student Information
            <span className="text-center italic text-xs font-light">
              (Please type or print neatly)
            </span>
          </h2>

          <Link href="/students">
            <button type="submit" className="btn btn-primary btn-sm">
              Show All Students
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="form-control">
            <label htmlFor="presentCollege" className="label">
              Your Present College
            </label>
            <input
              type="text"
              {...register("presentCollege")}
              className="input input-bordered"
              id="presentCollege"
            />
            {errors.presentCollege && (
              <p className="text-error mt-1">{errors.presentCollege.message}</p>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="presentConference" className="label">
              Your Present Conference
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
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
            <div className="form-control md:items-center">
              <label className="md:max-w-60 md:text-center">
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
              </div>
              {errors.previousSeasons && (
                <p className="text-error mt-1">
                  {errors.previousSeasons.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 md:col-span-3 gap-2">
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
                <p className="text-error mt-1">{errors.firstName.message}</p>
              )}
            </div>
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
          </div>

          <div className="form-control md:items-center">
            <label className="label">Gender</label>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <input
                  type="radio"
                  {...register("gender")}
                  value="Male"
                  id="genderMale"
                />
                <label htmlFor="genderMale">Male</label>
              </div>

              <div className="flex gap-2">
                <input
                  type="radio"
                  {...register("gender")}
                  value="Female"
                  id="genderFemale"
                />
                <label htmlFor="genderFemale">Female</label>
              </div>
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
              <p className="text-error mt-1">{errors.studentId.message}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="todaysDate" className="label">
              Today&apos;s Date
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="form-control col-span-2">
            <label htmlFor="address" className="label">
              Present Address, Street, City, State, Zip Code
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
              Telephone
            </label>
            <input
              type="text"
              {...register("telephone")}
              className="input input-bordered"
              id="telephone"
            />
            {errors.telephone && (
              <p className="text-error mt-1">{errors.telephone.message}</p>
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
              <p className="text-error mt-1">{errors.dateOfBirth.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="form-control col-span-2">
            <label htmlFor="highSchool" className="label">
              High School Last Attended, City, State, Zip Code
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

        {/* College Attended Section */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Colleges Attended</h2>
          <p className="mx-2 mb-4 text-sm">
            Accurately account for all your time between{" "}
            <em>high school graduation and the present</em>. Beginning with the
            year you left high school, list employment dates, periods of
            unemployment, armed forces service, and all educational institutions
            in which you have registered, including your present college.{" "}
            <em>Do</em> include summer school. <em>Do not</em> include summer{" "}
            <em>jobs</em>.
          </p>
          <div className="overflow-x-auto">
            <table className="table table-xs w-full">
              <thead>
                <tr>
                  <th className="text-left">From</th>
                  <th className="text-left">To</th>
                  <th className="text-left">College</th>
                  <th className="text-left">City</th>
                  <th className="text-left">State</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {collegesAttended.map((_, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="month"
                        {...register(`collegesAttended.${index}.from`)}
                        className="input input-bordered w-full"
                        placeholder="From date"
                      />
                      {errors.collegesAttended?.[index]?.from && (
                        <p className="text-error mt-1">
                          {errors.collegesAttended?.[index].from.message}
                        </p>
                      )}
                    </td>
                    <td>
                      <input
                        type="month"
                        {...register(`collegesAttended.${index}.to`)}
                        className="input input-bordered w-full"
                        placeholder="to"
                      />
                      {errors.collegesAttended?.[index]?.to && (
                        <p className="text-error mt-1">
                          {errors.collegesAttended?.[index].to.message}
                        </p>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        {...register(`collegesAttended.${index}.college`)}
                        className="input input-bordered w-full"
                        placeholder="College"
                      />
                      {errors.collegesAttended?.[index]?.college && (
                        <p className="text-error mt-1">
                          {errors.collegesAttended?.[index].college.message}
                        </p>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        {...register(`collegesAttended.${index}.city`)}
                        className="input input-bordered w-full"
                        placeholder="City"
                      />
                      {errors.collegesAttended?.[index]?.city && (
                        <p className="text-error mt-1">
                          {errors.collegesAttended?.[index].city.message}
                        </p>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        {...register(`collegesAttended.${index}.state`)}
                        className="input input-bordered w-full"
                        placeholder="State"
                      />
                      {errors.collegesAttended?.[index]?.state && (
                        <p className="text-error mt-1">
                          {errors.collegesAttended?.[index].state.message}
                        </p>
                      )}
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
                <tr className="text-right">
                  <td colSpan={6}>
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
          <p className="mx-2 mb-4 text-sm">
            Including this college and this season, list all of the colleges and
            sports in which you have
            <em>practiced, scrimmaged or competed,</em> including
            <em>club sports, JV, and varsity contests</em> since high school:
            (if you only practiced or scrimmaged in a sport, please state.)
          </p>
          <div className="overflow-x-auto">
            <table className="table table-xs w-full">
              <thead>
                <tr>
                  <th className="text-left">Sport</th>
                  <th className="text-left">College</th>
                  <th className="text-left">Varsity/JV/Club</th>
                  <th className="text-left">Semester</th>
                  <th className="text-left">Year</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {collegeSports.map((_, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        {...register(`collegeSports.${index}.sport`)}
                        className="input input-bordered w-full"
                        placeholder="Sport"
                      />
                      {errors.collegeSports?.[index]?.sport && (
                        <p className="text-error mt-1">
                          {errors.collegeSports?.[index].sport.message}
                        </p>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        {...register(`collegeSports.${index}.college`)}
                        className="input input-bordered w-full"
                        placeholder="College"
                      />
                      {errors.collegeSports?.[index]?.college && (
                        <p className="text-error mt-1">
                          {errors.collegeSports?.[index].college.message}
                        </p>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        {...register(`collegeSports.${index}.varsity`)}
                        className="input input-bordered w-full"
                        placeholder="Varsity"
                      />
                      {errors.collegeSports?.[index]?.varsity && (
                        <p className="text-error mt-1">
                          {errors.collegeSports?.[index].varsity.message}
                        </p>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        {...register(`collegeSports.${index}.semester`)}
                        className="input input-bordered w-full"
                        placeholder="Semester"
                      />
                      {errors.collegeSports?.[index]?.semester && (
                        <p className="text-error mt-1">
                          {errors.collegeSports?.[index].semester.message}
                        </p>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        {...register(`collegeSports.${index}.year`)}
                        className="input input-bordered w-full"
                        placeholder="Year"
                      />
                      {errors.collegeSports?.[index]?.year && (
                        <p className="text-error mt-1">
                          {errors.collegeSports?.[index].year.message}
                        </p>
                      )}
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
                <tr className="text-right">
                  <td colSpan={6}>
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

        <div className="mt-4 flex justify-center gap-5">
          <button
            type="reset"
            className="btn btn-outline btn-error"
            onClick={() => reset()}
          >
            Reset Form
          </button>
          <button type="submit" className="btn btn-primary">
            Submit Form
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
