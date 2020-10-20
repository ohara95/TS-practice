import React, { FC, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import { handleCloudUpload } from "../../utils/imageUpload";
import { usersData } from "../../atoms_recoil";
import { useRecoilValue } from "recoil";
import { db } from "../../config/firebase";
import { AuthContext } from "../../AuthService";

type Props = {
  icon: string;
  setIcon: (e: string) => void;
};

const IconUpload: FC<Props> = ({ icon, setIcon }) => {
  const users = useRecoilValue(usersData);
  const { user } = useContext(AuthContext);

  const activeId = users.find((db) => db.id === user.uid)?.activeGroupId;

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      handleCloudUpload("icons", file, setIcon);
    }
  };

  useEffect(() => {
    if (icon) db.collection("groups").doc(activeId).update({ iconUrl: icon });
  }, [icon]);

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
