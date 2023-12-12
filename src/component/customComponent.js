// // CustomComponent.js

// import React from 'react';
// import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

// const CustomComponent = ({ type, label, text, placeholder,imageSource, source, onPress, style }) => {
//   return (
//     <View style={[styles.container, style]}>
//       {label && <Text style={styles.label}>{label}</Text>}
//       {type === 'input' && (
//         <TextInput
//           style={[styles.input, styles.common]}
//           placeholder={placeholder}
//         />
//       )}
//       {type === 'touchable' && (
//         <TouchableOpacity onPress={onPress} style={[styles.touchable, styles.common]}>
//           <Text style={styles.text}>{text}</Text>
//         </TouchableOpacity>
//       )}
//       {type === 'image' && (
//         <View>
//           <Image
//             style={[styles.image, styles.common]}
//             source={{ uri: source }}
//           />
//           <Text style={styles.text}>{text}</Text>
//         </View>
//       )}
//       { type === 'image' && (
//       <View>
//         <Text>{text}</Text>
//         <Image source={imageSource} style={{ width: 50, height: 50 }} /> {/* Adjust the style as needed */}
//       </View>
//     )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   common: {
//     // Common styles for all types
//     marginBottom: 5,
//   },
  
//   label: {
//     marginBottom: 5,
//     fontWeight: 'bold',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//   },
//   touchable: {
//     padding: 10,
//     backgroundColor: 'blue',
//     alignItems: 'center',
//   },
//   image: {
//     width: 100,
//     height: 100,
//     resizeMode: 'cover',
//   },
//   text: {
//     color: 'white',
//   },
// });

// export default CustomComponent;
// CustomComponent.js

import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomComponent = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor:'#FFFFFF'
  },
});

export default CustomComponent;
