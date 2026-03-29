const VALID_USERNAME = "admin";
const VALID_PASSWORD = "password123";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Username and password are required" },
      { status: 400 }
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as Record<string, unknown>).username !== "string" ||
    typeof (body as Record<string, unknown>).password !== "string" ||
    ((body as Record<string, unknown>).username as string).trim().length === 0 ||
    ((body as Record<string, unknown>).password as string).trim().length === 0
  ) {
    return Response.json(
      { success: false, message: "Username and password are required" },
      { status: 400 }
    );
  }

  const { username, password } = body as { username: string; password: string };

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    return Response.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );
  }

  return Response.json(
    { success: false, message: "Invalid username or password" },
    { status: 401 }
  );
}
