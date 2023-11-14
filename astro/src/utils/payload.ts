import type { Department, Faq, Post, Social } from "@/types";

const url = import.meta.env.DEV ? "http://payload:3001" : import.meta.env.PAYLOAD_URL;

async function request(path: string) {
  return fetch(`${url}/api/${path}`).then((r) => r.json());
}

export async function getPosts(): Promise<Post[]> {
  return request("posts").then((r) => r.docs);
}

export async function getPost(id: string): Promise<Post> {
  return request(`posts/${id}`);
}

export async function getDepartments(): Promise<Department[]> {
  return request("departments").then((r) => r.docs);
}

export async function getFaq(): Promise<Faq> {
  return request("globals/faq");
}

export async function getSocials(): Promise<Social> {
  return request("globals/socials");
}
