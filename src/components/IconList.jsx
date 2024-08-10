import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { iconList } from "@/constants/icons";
import { icons } from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

const IconList = ({ selectedIcon }) => {
  const storageValue = JSON.parse(localStorage.getItem("value"));
  const BASE_URL = "https://logoexpress.tubeguruji.com";
  const [icon, setIcon] = useState(storageValue ? storageValue.icon : "Smile");
  const [pngIconList, setPngIconList] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getPngIcons();
  }, []);
  const Icon = ({ name, size, color }) => {
    const LucidIcon = icons[name];

    if (!LucidIcon) {
      return;
    }
    return <LucidIcon color={color} size={size} />;
  };

  const getPngIcons = () => {
    axios.get(BASE_URL + "/getIcons.php").then((res) => {
      console.log(res.data);
      setPngIconList(res.data);
    });
  };
  return (
    <div>
      <div>
        <label>Icon</label>
        <div
          onClick={() => setOpen(true)}
          className="p-3 cursor-pointer bg-gray-200 my-2 rounded-md w-[50px] h-[50px] flex items-center justify-center"
        >
          {icon?.includes(".png") ? (
            <img src={BASE_URL + "/png/" + icon} alt="icon" />
          ) : (
            <Icon name={icon} color={"#000"} size={20} />
          )}
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pick Of Favorite Icon</DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="icon" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="icon">Icon</TabsTrigger>
                  <TabsTrigger value="color-icon">Color Icon</TabsTrigger>
                </TabsList>
                <TabsContent value="icon">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 overflow-auto h-[400px] p-5">
                    {iconList.map((icon, index) => (
                      <div
                        key={index}
                        className="border p-3 flex rounded-sm items-center justify-center cursor-pointer"
                        onClick={() => {
                          selectedIcon(icon);
                          setOpen(false);
                          setIcon(icon);
                        }}
                      >
                        <Icon name={icon} color={"#000"} size={20} />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="color-icon">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 overflow-auto h-[400px] p-5">
                    {pngIconList?.map((icon, index) => (
                      <div
                        key={index}
                        className="border p-3 flex rounded-sm items-center justify-center cursor-pointer"
                        onClick={() => {
                          selectedIcon(icon);
                          setOpen(false);
                          setIcon(icon);
                        }}
                      >
                        <img src={BASE_URL + "/png/" + icon} alt="icon" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IconList;
