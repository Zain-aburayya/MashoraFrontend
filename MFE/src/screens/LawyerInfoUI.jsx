// /* eslint-disable react-native/no-inline-styles */
// import React, {useState} from 'react';
// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import Checkbox from '../components/Checkbox';
// import DocumentPicker from 'react-native-document-picker';
// import {pick} from 'react-native-document-picker';
// import RNFS from 'react-native-fs';

// function Title({text}) {
//   return (
//     <View style={styles.title}>
//       <Text style={styles.titleFont}>{text}</Text>
//     </View>
//   );
// }

// function ButtonReuse({text, onPress}) {
//   return (
//     <TouchableOpacity style={styles.button2} onPress={onPress}>
//       <Text style={styles.buttonText2}>{text}</Text>
//     </TouchableOpacity>
//   );
// }

// function LawyerInfo({route}) {
//   const [combinedLawyerData, setCombinedLawyerData] = useState(
//     route.params.lawyerInfo,
//   );

//   const [checkBoxState, setCheckBoxState] = useState(false);

//   const cusStyle = {
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: '#8A6F42',
//     padding: 10,
//     backgroundColor: '#fff',
//     marginTop: 15,
//     marginRight: 5,
//   };

//   async function uploadDocumentHandler() {
//     try {
//       console.log('here');
//       const doc = await pick({
//         type: [DocumentPicker.types.pdf, DocumentPicker.types.docx],
//         allowMultiSelection: false,
//         copyTo: 'cachesDirectory',
//       });
//       // TODO delete this log when we finish handling the API request
//       console.log(doc[0].fileCopyUri);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   function handleOnChange(value, feildName) {
//     setCombinedLawyerData({...combinedLawyerData, [feildName]: value});
//   }

//   return (
//     <>
//       <View style={styles.container}>
//         <Title text="إختر القوانين الذي تمتلك خبرة بها …" />
//         <View style={styles.containerCheckbox}>
//           <Checkbox
//             style={cusStyle}
//             text="القانون المدني   "
//             onPress={isChecked => handleOnChange(isChecked, 'civilLaw')}
//           />
//           <Checkbox style={cusStyle} text="الدولية الخاصة   " />
//           <Checkbox style={cusStyle} text="القانون الجنائي  " />
//           <Checkbox style={cusStyle} text="القانون التجاري  " />
//           <Checkbox style={cusStyle} text="القانون الإجرائية" />
//           <Checkbox style={cusStyle} text="القانون الدستوري " />
//           <Checkbox
//             style={cusStyle}
//             text="القانون الدولي   "
//             onPress={isChecked => handleOnChange(isChecked, 'internationalLaw')}
//           />
//           <Checkbox style={cusStyle} text="القانون الإداري والمالي" />
//         </View>
//         <Title text="اضف شهادة مزاولة المهنة الخاصة بك …" />
//         <TouchableOpacity
//           style={{marginTop: -10, marginBottom: 30}}
//           onPress={uploadDocumentHandler}>
//           <Image
//             source={require('./Images/uploadFile.jpeg')}
//             style={styles.image}
//           />
//         </TouchableOpacity>
//         <Checkbox
//           text="من خلال إنشاء حساب، فإنك توافق على شروط الاستخدام وسياسة
//           الخصوصية الخاصة بنا "
//           onPress={isChecked => setCheckBoxState(isChecked)}
//         />
//         <ButtonReuse
//           text="تسجيل"
//           onPress={() => {
//             // TODO Add the policies & file checker and call an API
//           }}
//         />
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     marginBottom: 20,
//   },
//   titleFont: {
//     fontFamily: 'OpenSans-Bold',
//     fontSize: 23,
//     fontWeight: 'bold',
//     color: '#8A6F42',
//   },
//   containerCheckbox: {
//     justifyContent: 'center',
//     flexDirection: 'row-reverse',
//     flexWrap: 'wrap',
//     marginBottom: 30,
//     marginTop: -30,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f2efeb',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//   },
//   nameInput: {
//     paddingHorizontal: 3,
//   },

//   input: {
//     height: 60,
//     width: 350,
//     borderColor: '#8A6F42',
//     borderWidth: 2,
//     borderRadius: 15,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     backgroundColor: '#F9F9F9',
//   },
//   input_name: {
//     height: 60,
//     width: 170,
//     borderColor: '#8A6F42',
//     borderWidth: 2,
//     borderRadius: 15,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     backgroundColor: '#F9F9F9',
//   },
//   button: {
//     backgroundColor: '#f2efeb',
//     paddingHorizontal: 25,
//     paddingVertical: 10,
//     marginBottom: 30,
//     borderRadius: 12,
//     borderColor: '#8A6F42',
//     borderWidth: 2,
//   },
//   buttonText: {
//     color: '#8A6F42',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   button2: {
//     backgroundColor: '#8A6F42',
//     paddingHorizontal: 150,
//     paddingVertical: 15,
//     borderRadius: 12,
//     marginTop: 20,
//     borderColor: '#f2efeb',
//     borderWidth: 2,
//   },
//   buttonText2: {
//     color: '#f2efeb',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   error: {
//     color: 'red',
//     fontSize: 12,
//     flexDirection: 'row-reverse',
//   },
//   image: {
//     width: 400,
//     height: 200,
//   },
// });

// export default LawyerInfo;

import React from 'react';
import {View, Button} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Platform} from 'react-native';

const uploadPdf = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });

    const fileUri = res.uri;
    const fileName = res.name;
    const fileType = res.type;

    const uploadUrl = 'http://10.0.2.2:8080/api/test/upload';

    const formData = new FormData();
    formData.append('file', {
      uri: Platform.OS === 'android' ? fileUri : fileUri.replace('file://', ''),
      type: fileType,
      name: fileName,
    });

    fetch(uploadUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Upload successful:', data);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('User cancelled the picker');
    } else {
      throw err;
    }
  }
};

const LawyerInfo = () => (
  <View>
    <Button title="Upload PDF" onPress={uploadPdf} />
  </View>
);

export default LawyerInfo;
