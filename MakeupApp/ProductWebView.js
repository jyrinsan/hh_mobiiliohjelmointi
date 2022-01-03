import React from 'react';
import { WebView} from 'react-native-webview'

export default function ProductWebView({ route, navigation}) {

  const { product} = route.params;

  return (
    <WebView
      source={{ uri: product.product_link }}
      style={{ marginTop: 20 }}
    />
  );
}