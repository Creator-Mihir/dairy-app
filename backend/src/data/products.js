const products = [
  {
    name: "A2 Cow Milk",
    category: "Milk", // Capitalized to match your sorting logic
    price: 75,
    description: "Light, easily digestible.", // Changed 'desc' to 'description' to match your DB model
    stock: 50, // Added default stock
    image: "https://plus.unsplash.com/premium_photo-1664647903833-318dce8f3239?w=900&auto=format&fit=crop&q=60"
  },
  {
    name: "Buffalo Milk",
    category: "Milk",
    price: 90,
    description: "Rich, creamy, high fat.",
    stock: 40,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=600"
  },
  {
    name: "Malai Paneer",
    category: "Curd", // Grouping under Curd/Paneer section
    price: 120,
    description: "Soft, fresh cubes.",
    stock: 25,
    image: "https://cdn.tarladalal.com/media/recipe/mainphoto/2024/12/19/Paneer_Recipe__How_To_Make_Paneer.webp"
  },
  {
    name: "Desi Ghee",
    category: "Ghee",
    price: 650,
    description: "Traditional Bilona method.",
    stock: 20,
    image: "https://cdn.shopify.com/s/files/1/0586/8234/3501/files/cow_desi_ghee_image.webp?v=1742634983"
  },
  {
    name: "Pot Set Curd",
    category: "Curd",
    price: 45,
    description: "Thick natural yogurt.",
    stock: 30,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_C77KgiD8F1YU7RePMjDMwYtRtXo5vLCxbA&s"
  },
  {
    name: "Masala Chaas",
    category: "Curd",
    price: 25,
    description: "Spiced Buttermilk.",
    stock: 40,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Jc645VbRmuiOv58p7i-ESUU8_N2HpeOT2w&s"
  }
];

export default products;