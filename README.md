Dashboard 

Explanation of the Approach:

The approach to the project involves several key steps to ensure it meets the requirements while being efficient and scalable.

Project Setup: The first step was to initialize the project with the necessary tools and frameworks. TypeScript was introduced for static type checking, improving code quality and reducing runtime errors. The directory structure was organized to separate concerns, with folders for components, services, and assets.

The Product Dashboard is a responsive web application for managing product listings and stock levels. It is built using Next.js and features a clean, visually appealing layout with a focus on user experience.

Dashboard Layout: The design incorporates a responsive layout, displaying product cards with key information such as name, price, and stock count. The cards are aligned in a grid format, and a horizontal scrollbar is available for easy navigation through the products.

Product Cards: Each product is represented by a card showing an image, the product name, price, stock availability, and a delete button. This allows for simple product management directly from the dashboard. Users can quickly view or remove products.

Sorting and Filtering: The dashboard includes a sorting and filtering functionality located at the top, enabling users to sort products by various criteria (e.g., price or stock level) and filter based on stock availability.

Add Product Button: A button labeled "Add Product" is provided to easily navigate to the product creation form, allowing users to add new products to the dashboard.

Dark Theme with Background Image: The dark-themed interface includes a sunset background, contributing to a pleasant visual experience. The pink-toned UI elements, such as the navigation bar and product cards, align well with the overall theme.

Stock Level Monitoring: The dashboard allows users to easily monitor product stock levels, and it provides visual cues for stock quantity, helping to identify products that may need restocking.

![Screenshot 2024-10-11 233004](https://github.com/user-attachments/assets/2fe3580a-f0ea-48ec-8805-ce64a7c6f97c)
		
Challenges Faced:

TypeScript Integration: Initially, there was some difficulty integrating TypeScript into the project, particularly in configuring the tsconfig.json file correctly and understanding the nuances of static typing compared to vanilla JavaScript.

Data Validation: Ensuring that data was properly validated both on the front-end and back-end required thoughtful design, as handling edge cases like missing fields or incorrect data formats was complex.

API Design: Creating RESTful API endpoints with proper error handling and validation required careful planning to ensure that the system could handle a variety of request types and responses gracefully.

Database connectivity: Issues with network connectivity can prevent the application from reaching the database and Incorrect database credentials, hostnames, or ports can lead to failed connection attempts.


