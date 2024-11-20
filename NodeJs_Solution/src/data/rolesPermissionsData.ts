export default [
  {
    role: "admin",
    permissions: [
      "Create Post",
      "Edit Post",
      "Delete Post",
      "View Posts",
      "Create Event",
      "Edit Event",
      "Delete Event",
      "Manage Users",
      "View Products",
      "Add Product",
      "Edit Product",
      "Delete Product",
    ],
  },
  {
    role: "startup",
    permissions: [
      "Create Post",
      "Edit Post",
      "Delete Post",
      "View Posts",
      "Respond to Post",
      "View Responses",
    ],
  },
  {
    role: "advisor",
    permissions: ["Respond to Post", "View Posts", "View Responses"],
  },
  {
    role: "organizer",
    permissions: [
      "Create Event",
      "Edit Event",
      "Delete Event",
      "RSVP to Event",
      "Track RSVPs",
      "Send Event Reminders",
    ],
  },
  {
    role: "participant",
    permissions: ["RSVP to Event", "View Events"],
  },
  {
    role: "customer",
    permissions: [
      "View Products",
      "Add Product to Cart",
      "Remove Product from Cart",
      "Checkout",
    ],
  },
  {
    role: "vendor",
    permissions: ["Add Product", "Edit Product", "Delete Product"],
  },
];
