type User = {
  name: string;
  email: string;
  password?: string;
};

const userDB: Record<string, User> = {
  "sachin121jindal@gmail.com": {
    name: "Test User",
    email: "sachin121jindal@gmail.com",
    password: "sachin",
  },
};

export const loginService = async (email: string, password: string) => {
  return new Promise<{ success: boolean; message: string; user?: User }>(
    (resolve) => {
      setTimeout(() => {
        const user = userDB[email];
        if (user && user.password === password) {
          resolve({ success: true, message: "Login successful", user });
        } else {
          resolve({ success: false, message: "Invalid credentials" });
        }
      }, 1000);
    }
  );
};

export const registerService = async (
  name: string,
  email: string,
  password: string
) => {
  return new Promise<{ success: boolean; message: string; user?: User }>(
    (resolve) => {
      setTimeout(() => {
        if (userDB[email]) {
          resolve({ success: false, message: "Email already exists" });
        } else {
          userDB[email] = { name, email, password };
          resolve({
            success: true,
            message: "Account created successfully",
            user: { name, email },
          });
        }
      }, 1000);
    }
  );
};
