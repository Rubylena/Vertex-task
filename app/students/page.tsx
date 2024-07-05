"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StudentData, ViewFormValues } from "../definitions/definitions";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { viewFormSchema } from "../lib/schema";
import { useTheme } from "../context/ThemeContext";

const Students = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ViewFormValues>({
    resolver: yupResolver(viewFormSchema) as any,
  });

  const [loadingStudents, setLoadingStudents] = useState(true);
  const [updateStudent, setUpdateStudent] = useState(false);
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>();
  const { theme } = useTheme();

  const onSubmit: SubmitHandler<ViewFormValues> = async (data) => {
    setUpdateStudent(true);
    try {
      const response = await axios.put("/api/students", data);
      fetchData();
      setEditIndex(null);
      toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(`${"Error fetching the data: " + error?.message}`);
    } finally {
      setUpdateStudent(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/students?id=${id}`);
      toast.success(response?.data?.message);
      fetchData();
    } catch (error: any) {
      console.log(error);
      toast.error(`${"Error fetching the data: " + error?.message}`);
    }
  };

  const fetchData = async () => {
    setLoadingStudents(true);
    try {
      const response = await axios.get("/api/students");
      setStudentData(response?.data?.data);
    } catch (error: any) {
      toast.error(`${"Error fetching the data: " + error?.message}`);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex gap-6">
        <Link href="/">
          <button type="submit" className="btn btn-primary btn-xs">
            Go Back
          </button>
        </Link>
        <h2 className="text-xl font-semibold mb-2">All Students</h2>
      </div>

      {loadingStudents ? (
        <div className="flex flex-col items-center justify-center gap-4 h-96 mt-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-[30rem]"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      ) : studentData && studentData.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <div
            className={`card bg-base-100 w-96 shadow ${
              theme === "dark" ? "shadow-white" : "drop-shadow"
            }  `}
          >
            <div className="card-body">
              <h2 className="card-title">No Student found</h2>
              <p>You can proceed to add a student</p>
              <div className="card-actions justify-end">
                <Link href="/">
                  <button className="btn btn-primary">Add Student</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="overflow-x-auto">
            <table className="table table-xs w-full">
              <thead>
                <tr>
                  <th className="text-left">Last Name</th>
                  <th className="text-left">First Name</th>
                  <th className="text-left">Gender</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {studentData.map((student, index: number) => (
                  <tr key={index}>
                    <td>
                      <input
                        {...register("id", { value: student.id })}
                        className="sr-only"
                      />
                      <input
                        type="text"
                        className={`input w-full p-0 ${
                          editIndex !== index ? "" : "hidden"
                        }`}
                        value={student.lastName}
                        readOnly
                      />
                      <div className={`${editIndex === index ? "" : "hidden"}`}>
                        <input
                          type="text"
                          {...register("lastName")}
                          className={`input input-bordered w-full`}
                          id="lastName"
                        />
                        {errors.lastName && (
                          <p className="text-error mt-1">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        className={`input w-full p-0 ${
                          editIndex !== index ? "" : "hidden"
                        }`}
                        value={student.firstName}
                        readOnly
                      />

                      <div className={`${editIndex === index ? "" : "hidden"}`}>
                        <input
                          type="text"
                          {...register("firstName")}
                          className={`input input-bordered w-full ${
                            editIndex === index ? "" : "hidden"
                          }`}
                          id="firstName"
                        />
                        {errors.firstName && (
                          <p className="text-error mt-1">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        className={`input w-full p-0 ${
                          editIndex !== index ? "" : "hidden"
                        }`}
                        value={student.gender}
                        readOnly
                      />
                      <div className={`${editIndex === index ? "" : "hidden"}`}>
                        <div
                          className={`flex flex-col ${
                            editIndex === index ? "" : "hidden"
                          }`}
                        >
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
                          <p className="text-error mt-1">
                            {errors.gender.message}
                          </p>
                        )}
                      </div>
                    </td>
                    <td>
                      {editIndex !== index ? (
                        <button
                          type="button"
                          className="btn btn-primary btn-xs"
                          onClick={() => setEditIndex(index)}
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-xs btn-outline"
                          onClick={() => setEditIndex(null)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                    <td>
                      {editIndex !== index ? (
                        <button
                          type="button"
                          className="btn btn-xs btn-outline btn-error"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-primary btn-xs"
                          disabled={updateStudent}
                        >
                          {updateStudent ? "Updating..." : "Update"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      )}
    </div>
  );
};

export default Students;
