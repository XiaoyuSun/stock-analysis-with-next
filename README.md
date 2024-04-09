# Stock Analysis with Next.js

This project aims to provide a web application for analyzing stocks using the Next.js framework. It allows users to input stock symbols and get various analyses and visualizations regarding the selected stocks.  
   
This project is also deployed on [vercel](https://stock-analysis-with-next.vercel.app/).

## Features

- **Stock Symbol Input**: Users can input stock symbols to analyze.
- **Demo Mode**: Use the demo data in ``/src/data``.
- **Choose Start Year and End year**: Select data in a year range.
- **Stock Data Visualization**: Visualizations of stock data including Quarterly net income, Quarterly total revenue, and Quarterly total shareholder.
- **Dark/Light mode**: Supports toggle Dark/Light mode.

## Getting Started

To get started with the project, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. create `.env` in the root path, and add `ALPHA_VANTAGE_API_KEY="YOUR_API_KEY"`
4. Run the development server using `npm run dev`.
5. Navigate to `http://localhost:3000` in your browser to access the application.

## Technologies Used

- **Next.js**: The framework used for building the web application.
- **React**: Used for building user interfaces.
- **Chart.js**: Library for creating various types of charts and graphs.
- **Tailwind CSS**: Utility-first CSS framework for styling components.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to [Xiaoyu Sun](https://github.com/XiaoyuSun) for creating and maintaining the project.
- Special thanks to the contributors of the project.
