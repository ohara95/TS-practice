import React, { FC, useContext } from "react";
import Button from "@material-ui/core/Button";
import { handleCloudUpload } from "../../utils/imageUpload";
import { currentGroupId, groupsData } from "../../atoms_recoil";
import { useRecoilValue, useRecoilState } from "recoil";
import { db } from "../../config/firebase";
import { AuthContext } from "../../AuthService";

type Props = {
  icon: string;
  setIcon: (e: string) => void;
};

const IconUpload: FC<Props> = ({ icon, setIcon }) => {
  const currentId = useRecoilValue(currentGroupId);
  const { user } = useContext(AuthContext);

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      handleCloudUpload("icons", file, setIcon);
    }
  };
  if (icon) {
    console.log(currentId);
    console.log(user);
    db.collection("groups").doc(currentId).update({ iconUrl: icon });
  }

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
