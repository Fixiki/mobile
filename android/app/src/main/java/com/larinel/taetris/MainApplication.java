package com.larinel.taetris;

import android.support.multidex.MultiDexApplication;

import com.facebook.react.ReactPackage;

import com.idehub.Billing.InAppBillingBridgePackage;

import java.util.Arrays;
import java.util.List;

// Needed for `react-native link`
// import com.facebook.react.ReactApplication;

public class MainApplication extends MultiDexApplication {

  // Needed for `react-native link`
  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        // Add your own packages here!
        // TODO: add cool native modules
        new InAppBillingBridgePackage(null)
        // Needed for `react-native link`
        // new MainReactPackage()
    );
  }
}
