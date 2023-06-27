export const POST = async (request) => {
  const { username, password, email, confirmPassword } = await request.json();

  return new Response(
    JSON.stringify({ username, email, password, confirmPassword }),
    {
      status: 201,
    },
  );
};
