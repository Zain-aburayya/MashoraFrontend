# Mashora Frontend

## Overview

Welcome to the Mashora frontend repository! This application is designed specifically for lawyers in Jordan and aims to expand its reach across the Middle East in the future. Mashora provides a platform for lawyers to manage their cases, communicate with clients, and streamline their workflow. The frontend is built using the React Native framework to ensure a smooth and efficient user experience across both iOS and Android devices.

## Features

- **Lawyer Management:** Easily manage lawyer profiles, including areas of expertise and ratings.
- **Client Communication:** Facilitate direct communication between lawyers and clients.
- **Case Management:** Organize and track cases with detailed information and status updates.
- **Document Handling:** Download and display PDFs related to legal documents and cases.

## Youtube Video

- **Automation Testing:** Here is the link of automation testing in practice [youtube.com](https://youtu.be/jG2hdscdXOk?si=IV6asGV2fthF_WaU)


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

## Maestro Automation Tool

To ensure the quality of the Mashora frontend, we utilize the Maestro automation tool for testing. Follow the steps below to install Maestro and run the test flows located in `MFE/automation_testing/flows`.

### Installing Maestro

1. **Download Maestro**

   Download the latest version of Maestro from the official repository or website.

2. **Install Maestro**

   For macOS and Linux:

   ```sh
   curl -Ls "https://maestro.com/install.sh" | bash
   ```

   For Windows, download the installer and follow the installation instructions.

3. **Verify Installation**

   Ensure Maestro is installed correctly by running:

   ```sh
   maestro --version
   ```

### Running Test Flows

1. **Navigate to the Automation Directory**

   ```sh
   cd MFE/automation_testing/flows
   ```

2. **Choose a Flow to Test**

   Review the available test flows and choose the one you want to run. For example, to run `login_flow.yaml`, use the following command:

   ```sh
   maestro run login_flow.yaml
   ```

   Replace `login_flow.yaml` with the name of the flow you want to test.

3. **Review Test Results**

   After running the test, review the results to ensure all tests passed. If any tests failed, analyze the logs and debug the issues.

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
