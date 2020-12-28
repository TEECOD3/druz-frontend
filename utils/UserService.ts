import IUser from "types/user";

export default class UserService {
  static getUser(): IUser | null {
    const user =
      typeof window !== "undefined" && localStorage.getItem("druz_user");
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  static getToken(): string | null {
    const token =
      typeof window !== "undefined" && localStorage.getItem("druz_token");
    if (!token) {
      return null;
    }
    return token;
  }

  static setUser(user: IUser | string): void {
    if (typeof user !== "string") {
      user = JSON.stringify(user);
    }
    typeof window !== "undefined" && localStorage.setItem("druz_user", user);
  }

  static setToken(token: string): void {
    typeof window !== "undefined" && localStorage.setItem("druz_token", token);
  }

  static clearCredentials(): void {
    typeof window !== "undefined" && localStorage.removeItem("druz_user");
    typeof window !== "undefined" && localStorage.removeItem("druz_token");
  }
}
