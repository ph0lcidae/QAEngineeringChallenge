## Prerequisites

- Android SDK >= 30
- Xcode >= 15
- expo-constants >= 14.5 (solves Android build issue)
- Java >= 11

## Dependencies

These tests depend on:

- Detox
- Jest

Installation should be handled by `yarn` when first setting up the app, but you may need to install `detox-cli` and `applesimutils` yourself:

```bash
brew tap wix/brew
brew install --HEAD applesimutils
yarn add detox-cli --dev
```

## Setup & Running

You'll need to have set up either the [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/) or the [Android emulator](https://developer.android.com/studio/run/emulator) (the simulator is strongly recommended for these specific demo purposes, it's a lot faster to get set up on a Mac).

You'll also need to add the Expo Go app binary to your project so Detox can hook into it:

1. [Download it](https://expo.dev/tools) from Expo (scroll down to "Run your project with Expo Go and click the small link to download the .ipa archive).
2. Unzip it, and rename the directory Exponent.app. (MacOS will give you a warning that it might see the directory as an app—just say yes, it's not actually an issue).
3. `cd QAEngineeringChallenge/native-app && mkdir bin`
4. Move the whole Exponent.app directory into `bin`.

After setting those up, open `e2e/.detoxrc.js` and change the iOS simulator or Android emulator target in `devices` to the one you're using, if need be (e.g. I'm using an iPhone 15 simulator, hence `iPhone 15`). Unless you're using a physically attached Android device, you can leave `android.att.*` alone.

After that, from `native-app`, run the following:

### iOS

```bash
cd ios
pod install
cd ..
detox build -c ios.sim.release -d
```

This might take a few minutes, but it is not necessary to rebuild unless the app has changed.

### Android

```bash
detox build -c android.emu.release -d
```

Same caveat as iOS: might take a few minutes, but only needs to be rebuilt if the app changes.

Once the app is built, you should just be able to run the tests:

```bash
detox test --configuration ios.sim.release
``` 
(or `android.emu.release` for Android, but I recommend iOS for this specific demo test suite)

## Adding tests

e2e tests can be added with a filename formatted like `*.test.js`; Detox uses Jest as the test runner. Page models can be found in `./pages`, and constants can be added to `TestConstants.js` in `./constants`.

You *do not* need to rebuild the app binaries if you're only adding tests.

## Troubleshooting

### *Whenever I try to run the iOS simulator, Expo says Xcode needs to be fully installed.*

Make sure you've actually opened the project in Xcode at least once. If that doesn't work, try running `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer` and restarting Expo.

### *The Detox build step fails and says it can't find the iOS build directory.*

Make sure you ran `pod install`.

### *Detox fails when it tries to run the tests on iOS and it looks like the simulator never comes up.*

This is most likely an Expo issue. Try running the simulator from Expo manually:

```bash
yarn start
i
(give it a second to load the app)
detox test --configuration ios.sim.release -d
```

### *I have an Android build issue with a cryptic error message from Gradle!*

Most likely you either need to update expo-constants to >= 14.5:
`yarn add expo-constants@14.5`

or you have an SDK version compatibility issue between React Native and the React picker module in the app:

1. Find the module directory in `node_modules`.
2. Navigate to the `android` directory and open `build.gradle`.
3. Find the `minSdkVersion` option and change it to whatever version React wants it to be (probably 21).
4. Rebuild.

### *I have some other problem you didn't mention!*

Get in touch and I'll take a look!