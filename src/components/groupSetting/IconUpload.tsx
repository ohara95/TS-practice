import React, { FC, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { handleCloudUpload } from "../../utils/imageUpload";
import { currentGroupId } from "../../atoms_recoil";
import { useRecoilValue } from "recoil";
import { db } from "../../config/firebase";

type Props = {
  icon: string;
  setIcon: (e: string) => void;
};

const IconUpload: FC<Props> = ({ icon, setIcon }) => {
  const currentId = useRecoilValue(currentGroupId);

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      handleCloudUpload("icons", file, setIcon);
    }
  };

  useEffect(() => {
    if (icon) {
      db.collection("groups").doc(currentId).update({ iconUrl: icon });
    }
  }, [icon]);

  console.log(icon);

  return (
    <form>
      <input
        id="contained-button-file"
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
