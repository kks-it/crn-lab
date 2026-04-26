export function getDefaultSlots() {
  return [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "01:00 PM - 03:00 PM",
    "03:00 PM - 05:00 PM",
    "05:00 PM - 07:00 PM",
    "07:00 PM - 09:00 PM",
  ];
}

export function getTodayDateValue() {
  return new Date().toISOString().split("T")[0];
}

export function bookingTypeLabel(type) {
  return type === "HOME_COLLECTION" ? "Home Sample Collection" : "Lab Visit";
}
