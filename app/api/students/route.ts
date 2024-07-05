import axios from "axios";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const res = await fetch("http://localhost:3001/students");
  const data = await res.json();
  return Response.json({ data, message: "Students fetched successfully." });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await fetch("http://localhost:3001/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return Response.json({ data, message: "Student added successfully." });
}

export async function PUT(request: NextRequest) {
  const updatedFields = await request.json();

  // Fetch current student details
  const response = await fetch(
    `http://localhost:3001/students/${updatedFields.id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch student details");
  }
  const currentStudentDetails = await response.json();

  // Merge current details with updated fields
  const updatedStudentDetails = { ...currentStudentDetails, ...updatedFields };

  const updateResponse = await fetch(
    `http://localhost:3001/students/${updatedFields.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudentDetails),
    }
  );

  if (!updateResponse.ok) {
    throw new Error("Failed to update student details");
  }

  const data = await updateResponse.json();

  return Response.json({ data, message: "Student updated successfully." });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const response = await axios.delete(`http://localhost:3001/students/${id}`);

  if (response.status === 200) {
    return Response.json({ message: "Student deleted successfully." });
  } else {
    return new Response(response.data, { status: response.status });
  }
}
