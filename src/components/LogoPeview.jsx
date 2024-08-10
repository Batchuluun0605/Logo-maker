import { UpdateStorageContext } from "@/context/updateStorageContext";
import html2canvas from "html2canvas";
// import { transform } from "html2canvas/dist/types/css/property-descriptors/transform";
import { icons } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
const BASE_URL = "https://logoexpress.tubeguruji.com";

const LogoPeview = ({ downloadIcon }) => {
  const [storageValue, setStorageValue] = useState();
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("value"));

    setStorageValue(storageData);
  }, [updateStorage]);

  useEffect(() => {
    if (downloadIcon) {
      downloadPngLogo();
    }
  }, [downloadIcon]);

  const downloadPngLogo = () => {
    const downloadLogoDiv = document.getElementById("downloadLogoDiv");

    html2canvas(downloadLogoDiv, { backgroundColor: null }).then((canvas) => {
      const pngImage = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngImage;
      downloadLink.download = "batchuluun.png";
      downloadLink.click();
    });
  };
  const Icon = ({ name, size, color, rotate }) => {
    const LucidIcon = icons[name];

    if (!LucidIcon) {
      return;
    }
    return (
      <LucidIcon
        color={color}
        size={size}
        style={{ transform: `rotate(${rotate}deg)` }}
      />
    );
  };
  return (
    <div className="flex justify-center items-center  h-screen ">
      <div
        className="h-[450px] w-[450px] bg-gray-200 outline-dotted outline-gray-300"
        style={{ padding: storageValue?.bgPadding }}
      >
        <div
          id="downloadLogoDiv"
          className="w-full h-full flex justify-center items-center"
          style={{
            borderRadius: storageValue?.bgRounded,
            background: storageValue?.bgColor,
          }}
        >
          {storageValue?.icon?.includes(".png") ? (
            <img
              src={"/png/" + storageValue?.icon}
              alt="icon"
              style={{
                height: storageValue?.iconSize,
                width: storageValue?.iconSize,
                transform: `rotate(${storageValue?.iconRotate}deg)`,
              }}
            />
          ) : (
            <Icon
              name={storageValue?.icon}
              color={storageValue?.iconColor}
              size={storageValue?.iconSize}
              rotate={storageValue?.iconRotate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoPeview;
