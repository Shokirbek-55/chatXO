// import { Platform } from 'react-native';
// import { ImagePickerResponse } from 'react-native-image-picker';
// import { DocumentPickerResponse } from 'react-native-document-picker';

// export const getMediaUri = (uri: string) =>
//   Platform.OS === 'android' ? uri : uri.replace('file://', '');

// type : 1 => image, type : 2 => video , type : 3 => audio
export const getMediaName = (file?: {}, type?: number) => {
  let name;
  if (type === 1) {
    name = "random_image.jpg";
  } else if (type === 2) {
    name = "random_video.mp4";
  } else {
    name = "random_audio.mp3";
  }

  return file || name;
};
