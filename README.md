# 🚗 CarFinder

A modern, responsive car search application built with Next.js, Tailwind CSS, and shadcn/ui components.

![CarFinder Screenshot](https://github.com/user-attachments/assets/0a6357da-8e15-47f9-a8a7-bc348b937c46)

## ✨ Features

- **Advanced Search & Filtering** - Find the perfect car based on brand, price range, fuel type, and seating capacity
- **Interactive UI** - Smooth transitions,and real-time updates
- **Wishlist Functionality** - Save your favorite cars for later viewing
- **Responsive Design** - Perfect experience on any device
- **Dark Mode** - Easy on the eyes with toggle between light and dark themes
- **Pagination** - Browse through large catalogs with ease

## 🛠️ Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework for production
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SwastikIIIT/CarFinder.git
   cd CarFinder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn next
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🗂️ Project Structure

```
car-finder/
├── app/
│   ├── api/           # API routes for car data
│   ├── car/[id]       # Individual car detail route
│   ├── page.js        # Home page with car search,filter and car cards
│   └── layout.js      # Root layout with providers
│
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── Header.jsx         # Header with searchbar and wishlist
│   ├── CarGrid.jsx        # Car display grid
│   ├── CarDetails.jsx     # Individual Car information
│   ├── FilterSidebar.jsx  # Filter controls
│   ├── LoadingState.jsx   # Loading indicators
│   ├── Pagination.jsx     # Pagination component
│   └── WishlistDrawer.jsx # Wishlist interface
│
├── lib/               # Utility functions
├── public/            # Static assets
└── ...config files
```

## 💡 Usage

### Search & Filter Cars

The main interface allows you to:
- Search for cars by model or brand name
- Filter by brand, price range, fuel type, and seating capacity
- Sort results by price (low to high or high to low)
- View 10 cars per page with pagination

### Managing Your Wishlist

- Click the heart icon on any car card to add it to your wishlist
- Access your wishlist by clicking the Wishlist button in the header
- Review and remove items from your wishlist
- Your wishlist persists between visits (saved in localStorage)

### Dark Mode

Toggle between light and dark themes using the theme button in the header.

## 🧩 API Routes

The application uses Next.js API routes to handle car data:

- `GET /api/cars` - Fetch all cars
- `GET /api/filter-cars` - Get filtered cars based on query parameters
- `GET /api/view-cars` - Get detailed information about a specific car

## 🔧 Configuration

You can customize various aspects of the application:

1. **Default Filters** - Edit the initial filter state in `app/page.js`
2. **API Endpoints** - Customize or replace the mock API in `app/api`
3. **Theme** - Modify Tailwind theme in `tailwind.config.js`

## 📱 Responsive Design

CarFinder is designed to work beautifully on:
- Desktop computers
- Tablets
- Mobile phones

The layout automatically adjusts to provide the best experience on any screen size.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Car data provided by [example-data-source]
- Icons by [Lucide](https://lucide.dev/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
