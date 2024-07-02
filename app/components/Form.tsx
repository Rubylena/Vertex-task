"use client";
// because of reach hooks

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

type FormValues = {
  presentCollege: string;
  //   presentConference: string;
  //   sportThisSeason: string;
  //   previousSeasons: string;
  //   firstName: string;
  //   lastName: string;
  //   middleInitial: string;
  //   gender: string;
  //   studentId: string;
  //   todaysDate: Date;
  //   address: string;
  //   phoneNumber?: string;
  //   dateOfBirth: Date;
  //   highSchool: string;
  //   lastDateAttended: Date;
  //   collegesAttended: { college: string; city: string; state: string }[];
  //   collegeSports: { sport: string; year: string; honors: string }[];
};

const schema = yup.object().shape({
  presentCollege: yup.string().required(),
  //   presentConference: yup.string().required(),
  //   sportThisSeason: yup.string().required(),
  //   previousSeasons: yup.string().required(),
  //   firstName: yup.string().required(),
  //   lastName: yup.string().required(),
  //   middleInitial: yup.string(),
  //   gender: yup.string().required(),
  //   studentId: yup.string().required(),
  //   todaysDate: yup.date().required(),
  //   address: yup.string().required(),
  //   phoneNumber: yup.string().optional().matches(/^[0-9]{10}$/, 'Phone number is not valid'),
  //   dateOfBirth: yup.date().required().test('age', 'You must be at least 18 years old', (value) => {
  //     return new Date().getFullYear() - value.getFullYear() >= 18;
  //   }),
  //   highSchool: yup.string().required(),
  //   lastDateAttended: yup.date().required(),
  //   collegesAttended: yup.array().of(
  //     yup.object().shape({
  //       college: yup.string().required(),
  //       city: yup.string().required(),
  //       state: yup.string().required(),
  //     })
  //   ).optional(),
  //   collegeSports: yup.array().of(
  //     yup.object().shape({
  //       sport: yup.string().required(),
  //       year: yup.string().required(),
  //       honors: yup.string().required(),
  //     })
  //   ).optional(),
});

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post("../api/routes", data);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/students");
        console.log(response?.data?.data);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form fields */}
      <div>
        <label>Present College</label>
        <input
          {...register("presentCollege")}
          className="input input-bordered"
        />
        {errors.presentCollege && <p>{errors.presentCollege.message}</p>}
      </div>
      {/* Add all other fields similarly */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
