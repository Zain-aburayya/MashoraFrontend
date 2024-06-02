# Mashora Frontend

## Overview

Welcome to the Mashora frontend repository! This application is designed specifically for lawyers in Jordan and aims to expand its reach across the Middle East in the future. Mashora provides a platform for lawyers to manage their cases, communicate with clients, and streamline their workflow. The frontend is built using the React Native framework to ensure a smooth and efficient user experience across both iOS and Android devices.

## Features

- **Lawyer Management:** Easily manage lawyer profiles, including areas of expertise and ratings.
- **Client Communication:** Facilitate direct communication between lawyers and clients.
- **Case Management:** Organize and track cases with detailed information and status updates.
- **Document Handling:** Download and display PDFs related to legal documents and cases.
- **Multilingual Support:** Translate English legal terms to Arabic to cater to a diverse user base.

## Prerequisites

Before you can run the Mashora frontend locally, you need to have the following installed:

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/)
- **Yarn**: Install via npm with the command `npm install -g yarn`
- **React Native CLI**: Install via npm with the command `npm install -g react-native-cli`
- **Watchman**: For macOS, install via Homebrew with `brew install watchman`
- **Xcode**: Required for iOS development. Download from the Mac App Store.
- **Android Studio**: Required for Android development. Download from [developer.android.com](https://developer.android.com/studio)

## Installation

Follow these steps to get the Mashora frontend running locally:

1. **Clone the Repository**

   ```sh
   git clone https://github.com/yourusername/mashora-frontend.git
   cd mashora-frontend
   ```

2. **Install Dependencies**

   ```sh
   yarn install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root of your project and add the necessary environment variables. Refer to the `.env.example` file for the required variables.

4. **Link Native Dependencies**

   ```sh
   npx react-native link
   ```

## Running the Application

### iOS

1. **Start the Metro Bundler**

   ```sh
   yarn start
   ```

2. **Run the iOS Application**

   ```sh
   npx react-native run-ios
   ```

   Ensure that Xcode is properly configured and the iOS simulator is available.

### Android

1. **Start the Metro Bundler**

   ```sh
   yarn start
   ```

2. **Run the Android Application**

   ```sh
   npx react-native run-android
   ```

   Ensure that Android Studio is properly configured and an Android emulator or physical device is connected.

## Contributing

We welcome contributions to the Mashora frontend! If you'd like to contribute, please follow these steps:

1. **Fork the Repository**

2. **Create a New Branch**

   ```sh
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**

4. **Commit Your Changes**

   ```sh
   git commit -m "Add your commit message"
   ```

5. **Push to Your Branch**

   ```sh
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**

   Go to the repository on GitHub and create a pull request to merge your changes into the main branch.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or issues, please open an issue on GitHub or contact us at zain.burayya@gmail.com.

Thank you for using Mashora!
