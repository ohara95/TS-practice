import React, { FC } from "react";
import Button from "@material-ui/core/Button";

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const ImageUpButton: FC<Props> = ({ onChange }) => {
  return (
    <form>
      <input
        id="contained-button-file"
        type="file"
        onChange={onChange}
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

export default ImageUpButton;
