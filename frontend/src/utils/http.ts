import { BACKEND_URL } from "../constants";
import { Member } from "../types";
import { objectToFormData } from "./misc";

async function request<T = void>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: FormData,
): Promise<T> {
  const response = await fetch(url, { method, body, mode: "cors" });
  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as unknown as T;
}

export async function getAllMembers() {
  return request<Member[]>(`${BACKEND_URL}/api/members/`);
}

export async function getMember(id: string) {
  return request<Member>(`${BACKEND_URL}/api/members/${id}/`);
}

export async function createMember(memberData: Member) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(memberData)) {
    if (value != null) {
      formData.set(key, value.toString());
    }
  }
  return request(`${BACKEND_URL}/api/members/`, "POST", formData);
}

export async function updateMember(memberData: Member) {
  return request(
    `${BACKEND_URL}/api/members/${memberData.id!}/`,
    "PUT",
    objectToFormData(memberData),
  );
}

export async function deleteMember(id: string) {
  return request(`${BACKEND_URL}/api/members/${id}/`, "DELETE");
}
