import { Smile } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import ColoraPickerController from "./ColoraPickerController";
import { UpdateStorageContext } from "@/context/updateStorageContext";
import IconList from "./IconList";

const IconController = () => {
  const storageValue = JSON.parse(localStorage.getItem("value"));

  const [size, setSize] = useState(storageValue ? storageValue.iconSize : 280);
  const [rotate, setRotate] = useState(
    storageValue ? storageValue.iconRotate : 0
  );
  const [color, setColor] = useState(
    storageValue ? storageValue.iconColor : "#fff"
  );
  const [icon, setIcon] = useState(storageValue ? storageValue.icon : "Smile");

  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);
  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      iconSize: size,
      iconColor: color,
      iconRotate: rotate,
      icon: icon,
    };
    setUpdateStorage(updatedValue);
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [size, color, rotate, icon]);
  return (
    <div>
      <div>
        <IconList selectedIcon={(icon) => setIcon(icon)} />
        <div className="py-2">
          <label className="p-2 flex justify-between items-center">
            Size <span>{size} px</span>
          </label>
          <Slider
            defaultValue={[size]}
            max={512}
            step={1}
            onValueChange={(event) => setSize(event[0])}
          />
        </div>
        <div className="py-2">
          <label className="p-2 flex justify-between items-center">
            Rotate <span>{size} °</span>
          </label>
          <Slider
            defaultValue={[rotate]}
            max={360}
            step={1}
            onValueChange={(event) => setRotate(event[0])}
          />
        </div>
        <div className="py-2">
          <label className="p-2 flex justify-between items-center">
            Icon color
          </label>
          <ColoraPickerController
            hideController={true}
            selectedColor={(color) => setColor(color)}
          />
        </div>
        <div className="h-[100px]"></div>
      </div>
    </div>
  );
};

export default IconController;
