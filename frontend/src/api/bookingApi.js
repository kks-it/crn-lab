import api from "./axios";

export async function fetchSlots(date) {
  const response = await api.get("/bookings/slots", {
    params: { date },
  });
  return response.data.slots;
}

export async function createBooking(payload) {
  const response = await api.post("/bookings", payload);
  return response.data;
}

export async function fetchMyBookings() {
  const response = await api.get("/bookings/my");
  return response.data;
}
