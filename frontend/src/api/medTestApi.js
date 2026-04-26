import api from "./axios";

export async function fetchMedTests() {
  const response = await api.get("/med-tests");
  return response.data;
}

export async function fetchMedTestCategories() {
  const response = await api.get("/med-tests/categories");
  return response.data;
}
