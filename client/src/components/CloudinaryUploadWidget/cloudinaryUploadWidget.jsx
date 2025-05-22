import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const CloudinaryUploadWidget = ({ uwConfig, setPublicId ,setState}) => {
  
    const uploadWidgetRef = useRef(null);
    const uploadButtonRef = useRef(null);

  useEffect(() => {
    
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === 'success') {
              console.log('Upload successful:', result.info);
              setState((prev)=>{
                if(prev.length>=4){
                    toast.error("You cant upload more than 4 images")
                    return prev
                }
                setPublicId(result.info.public_id);
                return [...prev,result.info.secure_url]
              })
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener('click', handleUploadClick);

        // Cleanup
        return () => {
          buttonElement.removeEventListener('click', handleUploadClick);
        };
      }
    };

    initializeUploadWidget();
  }, [uwConfig, setPublicId]);
  
  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="cloudinary-button"
    
    >
      Upload
    </button>
  );
};

export default CloudinaryUploadWidget;
