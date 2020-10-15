import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import { uploadTask } from "../../utils/imageUpload";

type Props = {
  // icon: string;
  setIcon: (e: string) => void;
  iconFile: File;
  setIconFile: (e: File) => void;
};
const IconUpload: FC<Props> = ({ setIcon, iconFile, setIconFile }) => {
  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setIconFile(file);
    }
  };
  const iconUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("icons", iconFile);

    uploadTask("icons", iconFile, setIcon);
  };
  return (
    <form onSubmit={iconUpload}>
      <input
        id="contained-button-file"
        multiple
        type="file"
        onChange={fileUpload}
        style={{ display: "none" }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="outlined" component="span" fullWidth>
          画像アップロード
        </Button>
      </label>
    </form>
  );
};

export default IconUpload;
