import Requests from "../http-common.ts";
import { AxiosResponse } from "axios";

export async function createNewRoom() {
  return (
    await Requests.post<string, AxiosResponse<string>>("streaming/newRoom")
  ).data;
}

export async function isStreamer(roomID: string) {
  return (
    await Requests.get<string, AxiosResponse<boolean>>(
      `streaming/room/${roomID}/isStreamer`,
    )
  ).data;
}
