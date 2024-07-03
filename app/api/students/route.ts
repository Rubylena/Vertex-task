import axios from "axios";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET() {
  try {
    const res = await fetch("http://localhost:3001/student");
    const data = await res.json();
    return Response.json({ data, message: "Students fetched successfully." });
  } catch (error: any) {
    console.log('in',error);
    // return Response.json({ error, status: 500 });
    // return error
    return new Response(error.message, {
      status: 500
    });
  }
}

export async function POST(request: Request) {
  try {
    const res = await fetch("http://localhost:3001/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ time: new Date().toISOString() }),
    });

    const data = await res.json();

    return Response.json({ data, message: "Student added successfully." });
  } catch (error: any) {
    return new Response(`Error encountered: ${error.message}`, {
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();
    const id = res.params.id;
    const res1 = await fetch(`http://localhost:3001/students/${id}`, {
      method: "PUT",
      body: JSON.stringify({ time: new Date().toISOString() }),
    });

    const data = await res1.json();

    return Response.json({ data, message: "Student updated successfully." });
  } catch (error: any) {
    return new Response(`Error encountered: ${error.message}`, {
      status: 500,
    });
  }
}

export async function Delete(request: Request) {
  console.log("in");
  try {
    const res = await request.json();
    const { id } = res.query;
    console.log(id);
    // const response = await fetch(`http://localhost:3001/students/${id}`, {
    //   method: "DELETE",
    // });

    const response = await axios.delete(`http://localhost:3001/students/${id}`);

    // if (!response.ok) {
    //   throw new Error(`Failed to delete student with ID ${id}`);
    // }

    return new Response(
      JSON.stringify({ message: "Student deleted successfully." }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);
    // return new Response(`Error encountered: ${error.message}`, {
    //   status: 500,
    // });
  }
}
