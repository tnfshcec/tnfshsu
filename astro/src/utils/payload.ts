import type { Department, Faq, Post } from "@/types";

const url = import.meta.env.DEV ? "http://payload:3001" : import.meta.env.PAYLOAD_URL;

async function request(path: string) {
  return (await fetch(`${url}/api/${path}`)).json();
}

export async function getPosts(): Promise<Post[]> {
  return request("posts").then((r) => r.docs);
}

export async function getPost(id: string): Promise<Post> {
  return request(`posts/${id}`);
}

export async function getDepartments(): Promise<Department[]> {
  return await request("departments").then((r) => r.docs);
}

export async function getFaq(): Promise<Faq> {
  return request("globals/faq");
}
