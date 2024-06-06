import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { PutObjectCommand, ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { Credentials } from "@aws-sdk/types";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
// import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from "@env";

interface ConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const options = {
  keyPrefix: "uploads/",
  bucket: "drp32",
  region: "eu-west-2",
  successActionStatus: 201
}

let credentials: Credentials = {
}

const client = new S3Client({
  region: options.region,
  credentials: credentials
})

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, onConfirm, onCancel, message }) => {
  const handleUploadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: result.assets[0].uri,
        name: "image.jpeg",
        type: "image/jpeg"
      }

      console.log(file.uri);

      await client.send(new PutObjectCommand({ Bucket: "drp32", Key: 'uploads/' + file.name, Body: file, }) ).then(response => {
        console.log(response);
      }).catch((error) => { console.log(error)})
      return true;
    }
  }

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.messageText}>{message}</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPhoto}>
            <Text style={styles.buttonText}>Upload Photo</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ConfirmationModal;
