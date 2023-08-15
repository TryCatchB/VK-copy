import { FC, useState } from "react";
import vkLogo from "./vk-logo.png";
import styles from "./Header.module.css";
import { Search } from "@mui/icons-material";

const Header: FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(true);

  return (
    <header className={styles.header}>
      <div className={styles.imgWrapper}>
        <img src={vkLogo} alt="Logo" />
      </div>
      <div className={styles.wrapper}>
        {isSearchActive && <Search />}
        <input
          type="text"
          placeholder="Поиск"
          onClick={() => setIsSearchActive(false)}
        />
      </div>
    </header>
  );
};

export default Header;
