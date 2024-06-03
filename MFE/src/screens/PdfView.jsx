/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

const PdfViewer = ({route}) => {
  const [pdfPath, setPdfPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const url = `http://10.0.2.2:8080/api/lawyers/downloadPdf/${route.params.id}`;
        const localFilePath = `${RNFS.DocumentDirectoryPath}/${route.params.id}.pdf`;

        const response = await RNFS.downloadFile({
          fromUrl: url,
          toFile: localFilePath,
          headers: {
            Authorization: `Bearer ${route.params.token}`, // if needed
          },
        }).promise;

        if (response.statusCode === 200) {
          setPdfPath(localFilePath);
        } else {
          console.log(response);
          setError('Failed to download PDF');
        }
      } catch (error) {
        console.error('Error fetching PDF:', error);
        setError('Error fetching PDF');
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [route.params.id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={{flex: 1}}>
      {pdfPath && (
        <Pdf
          source={{uri: pdfPath}}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          style={{flex: 1}}
        />
      )}
    </View>
  );
};

export default PdfViewer;
