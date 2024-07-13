import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';

const FileUpload: React.FC = () => {
  const queryClient = useQueryClient();

  const uploadFile = useMutation(
    async (file: File) => {
      const formData = new FormData();
      formData.append('resume', file);

      const { data } = await axios.post('http://localhost:4000/upload/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    },
    {
      onSuccess: (data: string) => {
        queryClient.setQueryData('fileText', data);
        console.log('File text:', data); // Log the string returned from API
      },
    }
  );

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    uploadFile.mutate(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text>Drop the file here...</Text>
        ) : (
          <Text>
            Drag and drop a PDF or DOCX file here, or click to select files
          </Text>
        )}
      </div>
      {uploadFile.isSuccess && (
        <Box mt={4}>
          <Text as="pre">{queryClient.getQueryData<string>('fileText')}</Text>
        </Box>
      )}
    </Box>
  );
};

const dropzoneStyles = {
  border: '2px dashed #ccc',
  padding: '20px',
  textAlign: 'center' as const,
  cursor: 'pointer' as const,
};

export default FileUpload;
