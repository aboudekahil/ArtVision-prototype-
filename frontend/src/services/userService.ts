import Requests from "../http-common.js";
import { LocalStorageUser } from "../shared.types.js";

export async function authenticate(user: {
  email: string;
  password: string;
}): Promise<LocalStorageUser> {
  return (await Requests.post<LocalStorageUser>("auth/signup", user)).data;
}

export async function userProfileImage(email: string): Promise<boolean> {
  return Requests.post("tfy/pfp", { email: email });
}
