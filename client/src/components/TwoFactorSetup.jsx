import { useEffect, useState } from "react";
import { setup2Fa } from "../services/api.mfauth";

// eslint-disable-next-line react/prop-types
const TwoFactorSetup = ({ setShowModal }) => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);

  const fetchQRCode = async () => {
    const { data } = await setup2Fa();
    console.log(data);
    setResponse(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  const copyClipBoard = async () => {
    await navigator.clipboard.writeText(response?.secret);
  };

  return (
    <section className="w-[320px] md:w-[340px] lg:w-[450px] relative">
      <div className="  text-black">
        <p className="text-center text-sm mt-3"></p>

        <div className="p-6">
          <div className="flex justify-center">
            {loading ? (
              <div className="mb-4 w-[230px] h-[200px] p-10 border rounded-md bg-slate-100"></div>
            ) : (
              <img
                src={response?.qrImageUrl}
                alt="2FA QR Code"
                className="mb-4 w-[50%] border rounded-md"
              />
            )}
          </div>
          <div className="flex items-center mt-3 mb-3">
            <div className="border-t border-1 border-gray-200 flex-grow"></div>
            <p className="text-gray-600 text-sm font-light px-2">
              OR Enter QR Code Manually
            </p>
            <div className="border-t border-1 border-gray-200 flex-grow"></div>
          </div>
          <div className="mb-6">
            <input
              readOnly
              defaultValue={""}
              value={response?.secret}
              onClick={copyClipBoard}
              className="w-[300px] md:w-[320px] lg:w-[400px] block  rounded-lg bg-slate-50 p-2 border-2 border-gray-200"
            />
          </div>
          <button
            className="w-full p-2 mt-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
            onClick={() => setShowModal(true)}
          >
            Continue to Verification
          </button>
        </div>
      </div>
      {/* Form to enter 2FA code */}
    </section>
  );
};

export default TwoFactorSetup;
