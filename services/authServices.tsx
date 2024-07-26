export const login = async (
  username: any,
  password: any,
  locale: any = "ru",
) => {
  if (!locale) {
    locale = "ru";
  }
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, locale }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data: any = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
