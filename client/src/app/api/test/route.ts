export const POST = async (request) => {
  const { username, password } = await request.json();

  return new Response(JSON.stringify({ username, password }), { status: 201 });
};
