import { useRef, useEffect } from "react";
import CustomerDisplayNavigation from '../../components/CustomerDisplayNavigation';
import { useCart } from '../../contexts/cartContext';

function CameraFeed() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 500, height: 250 },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error akses kamera:", err);
        alert("Tidak dapat mengakses kamera. Pastikan izin diberikan.");
      }
    }

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      width="500"
      height="250"
      autoPlay
      playsInline
      className="shadow-md rounded-md"
    />
  );
}

export default function Payment() {
  const { total } = useCart();
  return (
    <div className="flex flex-col items-center gap-10 bg-gray-100 mx-auto w-360 h-260">
        <CustomerDisplayNavigation />
        <div className="flex flex-col justify-center items-center gap-5 bg-white shadow-lg p-8 rounded-lg w-250">
          <h1 className="font-bold text-xl">Total Amount</h1>
          <p className="font-bold text-5xl">$ {total.toFixed(2)}</p>
          <p className="mt-4 text-lg">Please look at camera for Face Recognition Payement</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 bg-white shadow-lg p-8 rounded-lg w-250">
          <h1 className="text-2xl">Place your face within the frame</h1>
          <CameraFeed />
          <div className="flex justify-between items-center gap-10">
            <p>Face Detected</p>  {/*Example status*/}
            <p>Verifying Identity</p> {/*Example status*/}
          </div>
        </div>
    </div>
  );
}